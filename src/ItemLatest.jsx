import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, List, Segment } from 'semantic-ui-react';
import { listItems } from './graphql/queries';
import { API } from 'aws-amplify';
import SortingHelper from './helpers/SortingHelper';
import StringHelper from './helpers/StringHelper';
import DateTimeFormatter from './helpers/DateTimeFormatter';
import { ItemList, SegmentDateLabel, SectionHeader } from './helpers/UI';

export default function ItemLastest(props) {
    let { routePar } = useParams();
    const routeData = props.p[routePar];
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchItems();
    }, []);

    async function fetchItems() {
        const apiData = await API.graphql({ query: listItems, variables: {filter: {section: {eq: routeData.section }}}});
        var itemsFromAPI = apiData.data.listItems.items;
        itemsFromAPI = SortingHelper.orderArrayByObjectKey(itemsFromAPI, 'datetime', 'desc');
        itemsFromAPI = SortingHelper.createObjectWithDateKeyAndArray(itemsFromAPI);
        itemsFromAPI = Object.keys(itemsFromAPI).map(key => ({
            date: key,
            items: itemsFromAPI[key],
        }));
	setItems(itemsFromAPI);
    }

    return (
        <Container>
            <SectionHeader
                name={ routeData.name }
                route={ routeData.route }
                new
                plan
                settings
            />

            { items.map((dateObject, idx) => (
                <Segment key={idx}>
                    <SegmentDateLabel route={ routeData.route } date={ dateObject.date } />
                    <ItemList
                        items={ dateObject.items }
                        route={ routeData.route }
                        section={ routeData.section }
                        name={ routeData.name }
                    />
                </Segment>
            ))}
        </Container>
    )
}
