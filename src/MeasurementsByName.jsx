import React from 'react';
import ItemByName from './ItemByName';

export default function MeasurementsByName() {
    const item = (row) => <div>
        <span>{ row.var1 }</span>
    </div>

    return <ItemByName section="measurement" route="measurements" item={ item } />
}
