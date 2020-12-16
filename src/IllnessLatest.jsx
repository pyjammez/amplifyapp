import React from 'react';
import ItemLatest from './ItemLatest';

export default function IllnessLatest() {
    const item = (item) => <span>{ item.var1 }</span>

    return <ItemLatest route="illness" section="illness" item={ item } />
}
