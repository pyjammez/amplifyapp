import React from 'react';
import ItemLatest from './ItemLatest';

export default function MeasurementsLatest() {
    const item = (item) => <span>{ item.var1 }</span>

    return <ItemLatest route="measurements" section="measurement" item={ item } />
}
