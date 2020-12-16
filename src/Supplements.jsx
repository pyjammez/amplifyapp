import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, List, Segment } from 'semantic-ui-react';
import { listItems } from './graphql/queries';
import { API } from 'aws-amplify';
import SortingHelper from './helpers/SortingHelper';
import StringHelper from './helpers/StringHelper';
import { BC } from './helpers/BreadcrumbHelper';
import DateTimeFormatter from './helpers/DateTimeFormatter';
import { DashboardQuickButtons } from './helpers/Buttons';

export default function Supplements() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchItems();
    }, []);

    async function fetchItems() {
        const apiData = await API.graphql({ query: listItems, variables: {filter: {section: {eq: "supplement"}}}});
        var itemsFromAPI = apiData.data.listItems.items;
        itemsFromAPI = SortingHelper.orderArrayByObjectKey(itemsFromAPI, 'datetime', 'desc');
        itemsFromAPI = SortingHelper.createObjectWithDateKeyAndArray(itemsFromAPI);
        itemsFromAPI = Object.keys(itemsFromAPI).map(key => ({
            date: key,
            supplements: itemsFromAPI[key],
        }));
	setItems(itemsFromAPI);
    }

    function loop() {
        return items.map((dateObject, idx) => (
            <Segment key={idx} className="supplement-list-latest mt-20">
                <Link to={`/backend/supplements/by-date/${dateObject.date}`} className="segment-label">
                    <DateTimeFormatter value={ dateObject.date } date />
                </Link>

                <List.Description>
                    { dateObject.supplements.map((supplement, idx) => 
                        <div key={idx} className="supplement-daily-summary-row">
                            <Link
                                className="supplement-daily-summary-date"
                                to={`/backend/supplements/by-name/${encodeURIComponent(supplement.name)}`}>
                                { StringHelper.ucWords(supplement.name) }: &nbsp;&nbsp;
                            </Link>

                            <span>{ supplement.var1 }</span>
                            <span className="float-right">{ supplement.datetime.substring(11,19) }</span>
                        </div>
                    ) }
                </List.Description>
            </Segment>
        ));
    }

    return (
        <Container>
            <BC link="/backend/supplements" first="supplement" active="Supplements" />
            <DashboardQuickButtons route="supplements" new routine settings />
            <List>{ loop() }</List>
        </Container>
    )
}
