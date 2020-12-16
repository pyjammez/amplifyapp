import React from 'react';
import { List } from 'semantic-ui-react';
import DateTimeFormatter from './helpers/DateTimeFormatter';
import ItemByName from './ItemByName';

export default function IllnessByName() {
    const item = (row) => <div>
        <span>{ row.var1 } ({ row.var2 })</span>
    </div>

    return <ItemByName section="illness" route="illness" item={ item } />
}
