import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Container, List, Segment, Icon } from 'semantic-ui-react';
import SortingHelper from './helpers/SortingHelper';
import StringHelper from './helpers/StringHelper';
import DateHelper from './helpers/DateHelper';
import { BC } from './helpers/BreadcrumbHelper';
import DateTimeFormatter from './helpers/DateTimeFormatter';
import { getLastSevenDaysOfItems, getRoutines } from './helpers/ApiHelpers';
import { API, Auth } from 'aws-amplify';
import { DashboardQuickButtons, ExerciseSet } from './helpers/Buttons';
import { ItemList, SectionHeader } from './helpers/UI';

export default function ItemRoutine(props) {
    let { routePar } = useParams();
    const routeData = props.p[routePar];
    const [routineProgress, setRoutineProgress] = useState([]);

    useEffect(() => {
        fetchRoutinesAndItems();
    }, []);

    async function fetchRoutinesAndItems() {
        var date = new Date();
        var routinesData = await getRoutines();
        var lastSevenDaysOfExercise = await getLastSevenDaysOfItems('exercise');
        lastSevenDaysOfExercise = SortingHelper.sortExercisesByDateNameRepTime(lastSevenDaysOfExercise);
        console.log("check it", lastSevenDaysOfExercise);
        lastSevenDaysOfExercise = lastSevenDaysOfExercise.reduce((newObj, oldObj) => (
            newObj[oldObj['date']] = oldObj['exercises'], newObj
        ), {});

        // join the everyday routine onto the end of the day-specific routines
        const daysArray = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        let everydayRoutine = routinesData['everyday'] || "";
        var routinesObject = {};

        daysArray.forEach(key => {
            let routineForThatDay = routinesData[key] || "";
            let newString = routineForThatDay + ',' + everydayRoutine;
            routinesObject[key] = newString.split(',').map(e=>e.trim()).filter(Boolean);
        });

        // Count back from today to match the date with the name and add the progress
        var routinesAndProgress = [];

        for (var i = 0; i < 7; i++) {
            var newDate = new Date(date.setDate(date.getDate() - 1));
            var dateOnThatDay = newDate.toISOString().substring(0,10);
            var nameOfDay = DateHelper.todaysName(dateOnThatDay);
            var exercisesThatDay = lastSevenDaysOfExercise[dateOnThatDay] || [];
            var routineThatDay = routinesObject[nameOfDay];

            // turn array of objects into object {name: pushups, sets: [...]}
            exercisesThatDay = exercisesThatDay.reduce((newObj, oldObj) => (
                newObj[oldObj['name'].toLowerCase()] = oldObj['sets'], newObj
            ), {});

            // add the sets to the routine exercise name
            routineThatDay = routineThatDay.map((exerciseName) => {
                let exercise = exercisesThatDay[exerciseName.toLowerCase()] || [];

                return {
                    name: exerciseName,
                    sets: exercise
                };
            });

            routinesAndProgress.push({
                date: dateOnThatDay,
                dateName: daysArray[newDate.getDay()],
                routine: routineThatDay,
            });
        }

        setRoutineProgress(routinesAndProgress);
    }

    return (
        <Container>
            <SectionHeader
                name="Weekly Plan"
                route={ routeData.route }
                description="Prepare a weekly plan to stay persistant"
                editPlan
            />

            <List>
                { routineProgress.map((dateObject, idx) => (
                    <Segment key={idx} className="exercise-list-latest mt-20">
                        <Link to={`/backend/exercises/by-date/${dateObject.date}`} className="segment-label">
                            <DateTimeFormatter value={ dateObject.date } date />
                        </Link>

                        <List.Description>
                            { dateObject.routine.map((exercise, idx) => 
                                <div key={idx} className="exercise-routine-row">
                                    <Link
                                        className="exercise-routine-name"
                                        to={`/backend/exercises/by-name/${encodeURIComponent(exercise.name)}`}>
                                        { StringHelper.ucWords(exercise.name) }: &nbsp;&nbsp;
                                    </Link>

                                    <Button as={Link}
                                        className="exercise-routine-add float-right f-10"
                                        to={`/backend/exercises/new?name=${exercise.name}`} key={idx}>
                                        <Icon name="plus" />
                                    </Button>

                                    { exercise.sets.length ? exercise.sets.map((set, key) => 
                                        <ExerciseSet set={ set } key={ key } />
                                    ) : ''}

                                </div>
                            ) }
                        </List.Description>
                    </Segment>
                ))}
            </List>
        </Container>
    )
}
