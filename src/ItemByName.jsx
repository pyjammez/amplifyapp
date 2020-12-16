import React, { useState, useEffect } from 'react';
import { Button, Container, List, Segment } from 'semantic-ui-react';
import { listItems } from './graphql/queries';
import { API } from 'aws-amplify';
import SortingHelper from './helpers/SortingHelper';
import DateTimeFormatter from './helpers/DateTimeFormatter';
import { Link, useParams } from 'react-router-dom';
import { ItemList, SectionHeader, SegmentDateLabel } from './helpers/UI';

export default function ItemByName(props) {
    const { routePar, namePar } = useParams();
    const routeData = props.p[routePar];
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchItems();
    }, []);

    async function fetchItems() {
        const filter = {
            section: {eq: routeData.section},
            name: {eq: namePar}
        };

        const apiData = await API.graphql({ query: listItems, variables: {filter: filter}});
        var itemsFromAPI = apiData.data.listItems.items;
        itemsFromAPI = SortingHelper.orderArrayByObjectKey(itemsFromAPI, 'datetime', 'desc');
        itemsFromAPI = SortingHelper.createObjectWithDateKeyAndArray(itemsFromAPI);
        itemsFromAPI = Object.keys(itemsFromAPI).map(date => ({
            date: date,
            items: itemsFromAPI[date]
        }));
        itemsFromAPI = SortingHelper.orderArrayByObjectKey(itemsFromAPI, 'date', 'desc');
	setItems(itemsFromAPI);
    }

    return (
        <Container>
            <SectionHeader
                name={ namePar }
                route={ routeData.route }
                new
                latest
                plan
                settings
            />

            { items.map((dateObject, idx) => (
                <Segment key={idx}>
                    <SegmentDateLabel route={ routeData.route } date={ dateObject.date } />
                    <ItemList items={ dateObject.items } route={ routeData.route } section={ routeData.section } />
                </Segment>
            ))}
        </Container>
    )
}
