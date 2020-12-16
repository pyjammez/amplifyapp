import React from 'react';
import { List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { ExerciseSet } from './helpers/Buttons';
import DateTimeFormatter from './helpers/DateTimeFormatter';
import ItemByName from './ItemByName';

export default function ExercisesByName() {
    const item = (row) => <div>
        <ExerciseSet set={ row } />
    </div>

    return <ItemByName section="exercise" route="exercises" item={ item } />
}
