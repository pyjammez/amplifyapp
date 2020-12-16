import React from 'react';
import ItemLatest from './ItemLatest';

export default function ExercisesLatest() {
    const item = (item) => <span>{ item.var1 }</span>
    return <ItemLatest name="Latest" route="exercises" section="exercise" item={ item } />
}
