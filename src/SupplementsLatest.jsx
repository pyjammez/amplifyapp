import React from 'react';
import ItemLatest from './ItemLatest';

export default function SupplementsLatest() {
    const item = (item) => <span>{ item.var1 }</span>

    return <ItemLatest route="supplements" section="supplement" item={ item } />
}
