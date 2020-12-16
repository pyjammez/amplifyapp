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

export default function DietMacros() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchItems();
    }, []);

    async function fetchItems() {
        const apiData = await API.graphql({ query: listItems, variables: {filter: {section: {eq: "diet"}}}});
        var itemsFromAPI = apiData.data.listItems.items;
        var dateObject = {};

        itemsFromAPI.forEach((item) => {
            console.log(item);
            let date = item.datetime.substring(0,10);
            if (!dateObject[item.date]) dateObject[date] = {carbs: 0, protein: 0, fat: 0};
            dateObject[date]['carbs'] += parseInt(item['var1']);
            dateObject[date]['protein'] += parseInt(item['var2']);
            dateObject[date]['fat'] += parseInt(item['var3']);
        });

        var newArray = [];

        for (let key in dateObject) {
            newArray.push({date: key, ...dateObject[key]});
        }

console.log(newArray);
	setItems(newArray);
    }

    function loop() {
        return items.map((m, idx) => (
            <Segment key={idx} className="exercise-list-latest mt-20">
                <Link to={`/backend/diet/by-date/${ m.date }`} className="segment-label">
                    <DateTimeFormatter value={ m.date } date />
                </Link>

                <List.Description>
                    <div key={idx} className="diet-macros-row">
                        <span className="w25"><b>Carbs:</b> { m.carbs }g </span>
                        <span className="w27"><b>Protein:</b> { m.protein }g </span>
                        <span className="w18"><b>Fat:</b> { m.fat }g </span>
                        <span className="w30"><b>Calories:</b> { m.carbs*4 + m.protein*4 + m.fat*9 } </span>
                    </div>
                </List.Description>
            </Segment>
        ));
    }

    return (
        <Container>
            <BC link="/backend/diet" first="Diet" active="Macros" />
            <DashboardQuickButtons route="diet" new routine settings />
            <List>{ loop() }</List>
        </Container>
    )
}
