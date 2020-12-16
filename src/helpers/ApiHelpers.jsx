import {
    createItem as createItemMutation,
    updateItem as updateItemMutation,
    createRoutine as createRoutineMutation,
    deleteItem as deleteItemMutation
} from '../graphql/mutations';
import { listItems, getRoutinesByOwnerByCreatedAt } from '../graphql/queries';
import { API, Auth } from 'aws-amplify';

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
        await API.graphql({ query: formData.id ? updateItemMutation : createItemMutation, variables: { input: formData } });
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

async function getLastSevenDaysOfItems() {
    var date = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    date = date.toISOString().substring(0,10);

    const apiExerciseData = await API.graphql({ query: listItems, variables: {filter: {
        section: {eq: "exercise"},
        datetime: {gt: date}
    }}});

    var data = apiExerciseData.data.listItems.items;
    return data;
}

async function getRoutines() {
    const { username: owner } = await Auth.currentAuthenticatedUser();

    const routinesData = await API.graphql({ query: getRoutinesByOwnerByCreatedAt, variables: {
        sortDirection: 'DESC',
        limit: 1,
        owner: owner
    }});

    var data = routinesData.data.getRoutinesByOwnerByCreatedAt.items[0] || {};
    return data;
}

export {
    createItem,
    deleteItem,
    saveRoutine,
    getRoutines,
    getTodaysExercises,
    getLastSevenDaysOfItems
};
