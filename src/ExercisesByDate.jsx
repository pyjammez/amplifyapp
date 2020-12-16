import React from 'react';
import { List } from 'semantic-ui-react';
import DateTimeFormatter from './helpers/DateTimeFormatter';
import { Link } from 'react-router-dom';
import { ExerciseSet } from './helpers/Buttons';
import ItemByDate from './ItemByDate';

export default function ExercisesByDate() {
    const item = (row) => <div>
        <ExerciseSet set={ row } />
    </div>

    return <ItemByDate section="exercise" route="exercises" item={ item } />
}
