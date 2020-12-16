import React from 'react';
import ItemByDate from './ItemByDate';

export default function ProgressPhotosByDate() {
    const item = (row) => <div>
        { row.var1 }
    </div>

    return <ItemByDate section="progress-photo" route="progress-photos" item={ item } />
}
