import React from 'react';
import { List } from 'semantic-ui-react';
import DateTimeFormatter from './helpers/DateTimeFormatter';
import { Link } from 'react-router-dom';
import ItemByDate from './ItemByDate';

export default function InjuriesByDate() {
    const item = (row) => <div>
        { row.var1 } ({ row.var2 })
    </div>

    return <ItemByDate section="injury" route="injuries" item={ item } />
}
