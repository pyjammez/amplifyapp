import React from 'react';
import ItemByName from './ItemByName';

export default function SupplementsByName() {
    const item = (row) => <div>
        <span>{ row.var1 } servings</span>
    </div>

    return <ItemByName section="supplement" route="supplements" item={ item } />
}
