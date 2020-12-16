import React from 'react';
import ItemByDate from './ItemByDate';

export default function MeasurementsByDate() {
    const item = (item) => <div>
        <span>{ item.var1 }</span>
    </div>

    return <ItemByDate section="measurement" route="measurements" item={ item } />
}
