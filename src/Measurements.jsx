import React from 'react';
import ItemLatest from './ItemLatest';

export default function Measurements() {
    const item = (item) => <div>
        <span>{ item.var1 }</span>
    </div>

    return <ItemLatest route="measurements" section="measurement" item={ item } />
}
