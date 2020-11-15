import React, { useState, useEffect } from 'react';
import { Button, Container, List, Segment } from 'semantic-ui-react';
import { listItems } from './graphql/queries';
import { API } from 'aws-amplify';
import SortingHelper from './helpers/SortingHelper';
//import StringHelper from './helpers/StringHelper';
import { BC } from './helpers/BreadcrumbHelper';
import DateTimeFormatter from './helpers/DateTimeFormatter';
import { Link, useParams } from 'react-router-dom';

export default function ExercisesByName() {
    const { namePar } = useParams();

    const [items, setItems] = useState([]);
    const [name] = useState(namePar);


    useEffect(() => {
        fetchItems();
    });

    async function fetchItems() {
        const filter = {
            section: {eq: "exercise"},
            name: {eq: name}
        };

        const apiData = await API.graphql({ query: listItems, variables: {filter: filter}});
        var itemsFromAPI = apiData.data.listItems.items;
        itemsFromAPI = SortingHelper.orderArrayByObjectKey(itemsFromAPI, 'datetime', 'asc');
        var objectWithDateKey = SortingHelper.createObjectWithDateKeyNameKeyAndArray(itemsFromAPI);

        // We want the exercises performed on that day to be from first to last based on
        // the first set's time so if we started the workout with pushups, but finished up
        // with a final set of pushups, pushups will still be at the top because we did them first.
        itemsFromAPI = Object.keys(objectWithDateKey).map(date => {
            /*
             * Object of exercises and sets on that day
             *
             * {
             *   pushups: [1,2,3,4],
             *   squats: [1,2,3],
             *   pullups: [1,2]
             * }
             */
            var objectWithNameAsKey = objectWithDateKey[date];

            var arrayOfObjects = Object.keys(objectWithNameAsKey).map(name => {
                return {
                    datetime: objectWithNameAsKey[name][0]['datetime'], // first exericse in set
                    name: name,
                    sets: objectWithNameAsKey[name]
                }
            });
            
            return {
                date: date,
                exercises: SortingHelper.orderArrayByObjectKey(arrayOfObjects, 'datetime', 'asc')
            }
        });

        itemsFromAPI = SortingHelper.orderArrayByObjectKey(itemsFromAPI, 'date', 'desc');
	setItems(itemsFromAPI);
    }

    function loop() {
        return items.map((dateObject, idx) => (
            <Segment key={idx} className="exercise-list-latest mt-20">
                <Link to={`/backend/exercises/by-date/${dateObject.date}`} className="segment-label">
                    <DateTimeFormatter value={ dateObject.date } date />
                </Link>
 
                { dateObject.exercises.map((exercises, idx) => 
                    <List key={idx} className="exercise-by-name-list">
                        { exercises.sets.map((set, idx) => 
                            <List.Item as={Link} to={`/backend/exercises/${set.id}/edit`} key={idx}>
                                <span className="exercise-by-date-set">{ set.var1 }x{ set.var2}</span>
                                -
                                <span className="exercise-by-date-time">
                                    <DateTimeFormatter format="hh:mm:ss" time value={set.datetime} />
                                </span>
                            </List.Item>
                        ) }
                    </List>
                ) }
            </Segment>
        ));
    }

    return (
        <Container>
            <BC link="/backend/exercises" first="Exercise" active={ name } />

            <Button size="tiny" className="add-button" floated="right" as={Link} to="/backend/exercises/new">Add</Button>

            <List>{ loop() }</List>
        </Container>
    )
}
