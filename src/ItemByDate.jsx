import React, { useState, useEffect } from 'react';
import { Container, List, Segment } from 'semantic-ui-react';
import { listItems } from './graphql/queries';
import { API } from 'aws-amplify';
import SortingHelper from './helpers/SortingHelper';
import DateTimeFormatter from './helpers/DateTimeFormatter';
import { Link, useParams } from 'react-router-dom';
import { ItemList, SectionHeader, SegmentNameLabel } from './helpers/UI';

export default function ItemByDate(props) {
    let { routePar, datePar } = useParams();
    const routeData = props.p[routePar];
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchItems();
    }, []);

    async function fetchItems() {
        const filter = {
            section: {eq: routeData.section},
            datetime: {beginsWith: datePar}
        };

        const apiData = await API.graphql({ query: listItems, variables: {filter: filter}});
        var itemsFromAPI = apiData.data.listItems.items;
        itemsFromAPI = SortingHelper.orderArrayByObjectKey(itemsFromAPI, 'datetime', 'asc');
        itemsFromAPI = SortingHelper.createObjectWithNameKeyAndArray(itemsFromAPI);
        itemsFromAPI = Object.keys(itemsFromAPI).map(name => {
            let arrayOfItems = itemsFromAPI[name];
            let lastItem = arrayOfItems[arrayOfItems.length-1];

            return {
                date: lastItem['datetime'],
                name: name,
                items: arrayOfItems
            }
        });
        itemsFromAPI = SortingHelper.orderArrayByObjectKey(itemsFromAPI, 'date', 'desc');
	setItems(itemsFromAPI);
    }

    return (
        <Container>
            <SectionHeader
                name={<DateTimeFormatter value={ datePar } date />}
                route={ routeData.route }
                new
                latest
                plan
                settings
            />

            { items.map((nameObj, idx) => (
                <Segment key={idx}>
                    <SegmentNameLabel route={ routeData.route } name={ nameObj.name } />
                    <ItemList items={ nameObj.items } route={ routeData.route } section={ routeData.section } />
                </Segment>
            ))}
        </Container>
    )
}
