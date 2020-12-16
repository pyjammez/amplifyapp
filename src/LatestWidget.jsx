import React from 'react';
import { List } from 'semantic-ui-react';
// don't forget to add nov 25 10:05pm another 72 minutes and 3 miles.

const LatestWidget = (props) => {
    return (
        <List>
            <List.Item>
                Latest widget here with limit { props.limit }
            </List.Item>
        </List>
    )
}

export default LatestWidget;
