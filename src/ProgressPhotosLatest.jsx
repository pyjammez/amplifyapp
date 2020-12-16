import React from 'react';
import ItemLatest from './ItemLatest';

export default function ProgressPhotosLatest() {
    const item = (item) => <span>{ item.var1 }</span>

    return <ItemLatest route="progress-photos" section="progress-photo" item={ item } />
}
