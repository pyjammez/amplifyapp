import React from 'react';
import ItemLatest from './ItemLatest';

export default function InjuriesLatest() {
    const item = (item) => <span>{ item.var1 }</span>

    return <ItemLatest route="injuries" section="injury" item={ item } />
}
