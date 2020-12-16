import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, List, Segment } from 'semantic-ui-react';
import { listItems } from './graphql/queries';
import { API } from 'aws-amplify';
import SortingHelper from './helpers/SortingHelper';
import StringHelper from './helpers/StringHelper';
import { BC } from './helpers/BreadcrumbHelper';
import DateTimeFormatter from './helpers/DateTimeFormatter';
import { DashboardQuickButtons, ExerciseSet } from './helpers/Buttons';
import SectionHeader from './helpers/SectionHeader';

export default function Exercises() {
    const [items, setItems] = useState([]);

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

                            { exercises.sets.map((set, key) => 
                                <ExerciseSet set={ set } key={ key } />
                            ) }
                        </div>
                    ) }
                </List.Description>
            </Segment>
        ));
    }

    return (
        <Container>
            <SectionHeader name="Exercises" route="exercises" section="exercise" description="" /> 
            What do I do with this page now?
        </Container>
    )
}
