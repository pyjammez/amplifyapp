import React from 'react';
import ItemByDate from './ItemByDate';

export default function SupplementsByDate() {
    const item = (row) => <div>
        { row.var1 } servings
    </div>

    return <ItemByDate section="supplement" route="supplements" item={ item } />
}
