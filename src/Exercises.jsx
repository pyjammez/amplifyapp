import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, List, Segment } from 'semantic-ui-react';
import { listItems } from './graphql/queries';
import { API } from 'aws-amplify';
import SortingHelper from './helpers/SortingHelper';
import StringHelper from './helpers/StringHelper';
import { BC } from './helpers/BreadcrumbHelper';
import DateTimeFormatter from './helpers/DateTimeFormatter';

export default function Exercises() {
    const [items, setItems] = useState([]);
    //const [date, setDate] = useState([]);

    useEffect(() => {
        fetchItems();
    }, []);

    async function fetchItems() {
        const apiData = await API.graphql({ query: listItems, variables: {filter: {section: {eq: "exercise"}}}});
        var itemsFromAPI = apiData.data.listItems.items;
        itemsFromAPI = SortingHelper.sortExercisesByDateNameRepTime(itemsFromAPI);
	setItems(itemsFromAPI);
    }

    function loop() {
        return items.map((dateObject, idx) => (
            <Segment key={idx} className="exercise-list-latest mt-20">
                <Link to={`/backend/exercises/by-date/${dateObject.date}`} className="segment-label">
                    <DateTimeFormatter value={ dateObject.date } date />
                </Link>

                <List.Description>
                    { dateObject.exercises.map((exercises, idx) => 
                        <div key={idx} className="exercise-daily-summary-row">
                            <Link
                                className="exercise-daily-summary-date"
                                to={`/backend/exercises/by-name/${encodeURIComponent(exercises.name)}`}>
                                { StringHelper.ucWords(exercises.name) }: &nbsp;&nbsp;
                            </Link>

                            { exercises.sets.map((set, idx) => 
                                <Link
                                    className="exercise-daily-summary-set"
                                    to={`/backend/exercises/${set.id}/edit`} key={idx}>
                                    { set.var1 }x{ set.var2}
                                </Link>
                            ) }
                        </div>
                    ) }
                </List.Description>
            </Segment>
        ));
    }

    return (
        <Container>
            <BC link="/backend/exercises" first="Exercise" active="Daily Summary" />

            <Button size="tiny" className="add-button" floated="right" as={Link} to="/backend/exercises/new">Add</Button>

            <List>{ loop() }</List>
        </Container>
    )
}
