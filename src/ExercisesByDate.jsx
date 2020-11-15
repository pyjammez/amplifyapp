import React, { useState, useEffect } from 'react';
import { Button, Container, List, Segment } from 'semantic-ui-react';
import { listItems } from './graphql/queries';
import { API } from 'aws-amplify';
import SortingHelper from './helpers/SortingHelper';
import StringHelper from './helpers/StringHelper';
import { BCDate } from './helpers/BreadcrumbHelper';
import DateTimeFormatter from './helpers/DateTimeFormatter';
import { Redirect, Link, useParams } from 'react-router-dom';

export default function ExercisesByDate() {
    let { datePar } = useParams();

    const [items, setItems] = useState([]);
    const [date, setDate] = useState(datePar);


    useEffect(() => {
        fetchItems();
    }, []);

    async function fetchItems() {
        const filter = {
            section: {eq: "exercise"},
            datetime: {beginsWith: date}
        };

        const apiData = await API.graphql({ query: listItems, variables: {filter: filter}});
        var itemsFromAPI = apiData.data.listItems.items;
        itemsFromAPI = SortingHelper.sortExercisesByDateNameRepTime(itemsFromAPI);
	setItems(itemsFromAPI[0] ? itemsFromAPI[0].exercises : []);
    }

    function loop() {
        return items.map((exercise, idx) => (
            <Segment key={idx} className="exercise-list-latest mt-20">
                <Link to={`/backend/exercises/by-name/${encodeURIComponent(exercise.name)}`} className="segment-label">
                    { StringHelper.ucWords(exercise.name) }
                </Link>

                <List>
                    { exercise.sets.map((set, idx) => 
                        <List.Item as={Link} to={`/backend/exercises/${set.id}/edit`} key={idx}>
                            <span className="exercise-by-date-set">{ set.var1 }x{ set.var2}</span>
                            -
                            <span className="exercise-by-date-time">
                                <DateTimeFormatter format="hh:mm:ss" time value={set.datetime} />
                            </span>
                        </List.Item>
                    ) }
                </List>
            </Segment>
        ));
    }

    return (
        <Container>
            <BCDate date={ date } />

            <Button size="tiny" className="add-button" floated="right" as={Link} to="/backend/exercises/new">Add</Button>

            <List>{ loop() }</List>
        </Container>
    )
}
