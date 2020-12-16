import React from 'react';
import { List } from 'semantic-ui-react';
import DateTimeFormatter from './helpers/DateTimeFormatter';
import ItemByName from './ItemByName';

export default function DietByName() {
    const item = (row) => <div>
        <span>{ row.var1 }c { row.var2 }p {row.var3}f</span>
    </div>

    return <ItemByName section="diet" route="diet" item={ item } />
}
