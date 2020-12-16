import React from 'react';
import ItemByName from './ItemByName';

export default function ProgressPhotosByName() {
    const item = (row) => <div>
        <span>{ row.var1 }</span>
    </div>

    return <ItemByName section="progress-photo" route="progress-photos" item={ item } />
}
