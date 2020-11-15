import React, { useState, useEffect } from 'react';
import { createItem, deleteItem } from './helpers/ApiHelpers';
import { FInput, DateTime, SaveAndDelete } from './helpers/FormHelpers';
import { List, Container, Form } from 'semantic-ui-react';
import { Link, useParams } from 'react-router-dom';
import { BC } from './helpers/BreadcrumbHelper';
import { API, Auth } from 'aws-amplify';
import { listItems, getRoutinesByOwnerByCreatedAt} from './graphql/queries';
import { getTodaysExercises } from './helpers/ApiHelpers';
import SortingHelper from './helpers/SortingHelper';
import StringHelper from './helpers/StringHelper';
import DateHelper from './helpers/DateHelper';
import { useHistory } from "react-router-dom";


export default function TodaysRoutine() {
    const [todaysRoutineProgress, setTodaysRoutineProgress] = useState([]);

    useEffect(() => {
        fetchRoutineAndItems();
    }, []);

    async function fetchRoutineAndItems() {
        var date = new Date();
        var todaysDate = date.toISOString().substring(0,10);
        var todaysName = DateHelper.todaysName(date);
        var todaysExercises = await getTodaysExercises(todaysDate);
        todaysExercises = SortingHelper.sortExercisesByDateNameRepTime(todaysExercises);

        var todaysExercisesObj = {};
        todaysExercises = todaysExercises[0]['exercises'];
        todaysExercises.forEach((exercise) => {
            todaysExercisesObj[exercise.name] = exercise.sets;
        });

        // Get today's routine + everyday routine
        const { username: owner } = await Auth.currentAuthenticatedUser();
        const apiData = await API.graphql({ query: getRoutinesByOwnerByCreatedAt, variables: {
            sortDirection: 'DESC',
            limit: 1,
            owner: owner
        }});

        let routines = apiData.data.getRoutinesByOwnerByCreatedAt.items[0] || [];
        let t = routines[todaysName] || '';
        let e = routines['everyday'] || '';
        if (t & e) e = ','+e;
        let todaysRoutine = t + e;
        todaysRoutine = todaysRoutine.split(',').map(e=>e.trim());

        // loop through routines, and add the exercises/reps/sets in.
        todaysRoutine = todaysRoutine.map((exercise) => {
            return {
                name: exercise,
                sets: todaysExercisesObj[exercise] || []
            };
        });

        setTodaysRoutineProgress(todaysRoutine);
    }


    return <List.Description>
        { todaysRoutineProgress.map((exercises, idx) => 
            <div key={idx} className="exercise-daily-summary-row">
                <Link
                    className="exercise-daily-summary-date"
                    to={`/backend/exercises/by-name/${encodeURIComponent(exercises.name)}`}>
                    { StringHelper.ucWords(exercises.name) }: &nbsp;&nbsp;
                </Link>

                { exercises.sets.length ? exercises.sets.map((set, idx) => 
                    <Link
                        className="exercise-daily-summary-set"
                        to={`/backend/exercises/${set.id}/edit`} key={idx}>
                        { set.var1 }x{ set.var2}
                    </Link>
                ) : 
                    <Link
                        className="exercise-daily-summary-set"
                        to={`/backend/exercises/new?name=${exercises.name}`} key={idx}>
                        Add
                    </Link>
                }
            </div>
        ) }
    </List.Description>
}
