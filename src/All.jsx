import React, { useState, useEffect } from 'react';
import { Button, Container, List, Segment } from 'semantic-ui-react';
import { listItems } from './graphql/queries';
import { deleteItem } from './helpers/ApiHelpers';
import { API } from 'aws-amplify';
import { BC } from './helpers/BreadcrumbHelper';

export default function All() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchItems();
    }, []);

    async function fetchItems() {
        const apiData = await API.graphql({ query: listItems });
        console.log(apiData);

        var itemsFromAPI = apiData.data.listItems.items;
        setItems(itemsFromAPI);
    }

    function del(id) {
        const newItemsArray = items.filter(item => item.id !== id);
        setItems(newItemsArray);
        deleteItem({id: id});
    }

    function loop() {
        return items.map((item) => (
            <Segment key={item.id} className="all-list mt-20">
            {item.section } {item.datetime} {item.name}
            <List.Item onClick={() => del(item.id)} className="color-red f-12 underline cursor-pointer">Delete</List.Item>
            </Segment>
        ));
    }

    return (
        <Container>
            <BC link="/backend/dashboard" first="Home" active="All Items" />
            <List>{ loop() }</List>
        </Container>
    )
}
