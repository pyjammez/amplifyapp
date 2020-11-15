import {
    createItem as createItemMutation,
    createRoutine as createRoutineMutation,
    deleteItem as deleteItemMutation
} from '../graphql/mutations';
import { listItems, getRoutinesByOwnerByCreatedAt} from '../graphql/queries';
import { API } from 'aws-amplify';

async function saveRoutine(formData) {
    try {
        console.log('data', formData);
        await API.graphql({ query: createRoutineMutation, variables: { input: formData } });
    } catch (err) {
        console.log('error creating routine:', err);
    }
}

async function createItem(formData) {
    try {
        console.log(formData,'before joining datetime together');
        formData['datetime'] = formData['date'] + " " + formData['time'];
        delete formData['date'];
        delete formData['time'];
        await API.graphql({ query: createItemMutation, variables: { input: formData } });
        console.log(formData);
    } catch (err) {
        console.log('error creating item:', err);
    }
}

async function deleteItem({ id }) {
    try {
        await API.graphql({ query: deleteItemMutation, variables: { input: { id } }});
    } catch (err) {
        console.log('error deleting:', err);
    }
}

async function getTodaysExercises(today) {
    const apiExerciseData = await API.graphql({ query: listItems, variables: {filter: {
        section: {eq: "exercise"},
        datetime: {beginsWith: today}
    }}});

    var data = apiExerciseData.data.listItems.items;
    return data;
}
 

export { createItem, deleteItem, saveRoutine, getTodaysExercises };
