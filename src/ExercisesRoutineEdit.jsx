import React, { useState, useEffect } from 'react';
import { saveRoutine } from './helpers/ApiHelpers';
import { Container, Form, Button } from 'semantic-ui-react';
import { BC } from './helpers/BreadcrumbHelper';
import { API, Auth } from 'aws-amplify';
import { getRoutinesByOwnerByCreatedAt } from './graphql/queries';
import { useHistory } from "react-router-dom";
import StringHelper from './helpers/StringHelper';


export default function ExercisesRoutineEdit() {
    const initialFormState = {
        everyday: '',
        monday: '',
        tuesday: '',
        wednesday: '',
        thursday: '',
        friday: '',
        saturday: '',
        sunday: '',
    }

    const [formData, setFormData] = useState(initialFormState);

    let history = useHistory();

    useEffect(() => {
        fetchRoutine();
    }, []);

    async function fetchRoutine() {
        const { username: owner } = await Auth.currentAuthenticatedUser();
        const apiData = await API.graphql({ query: getRoutinesByOwnerByCreatedAt, variables: {
            sortDirection: 'DESC',
            limit: 1,
            owner: owner
        }});

        let items = apiData.data.getRoutinesByOwnerByCreatedAt.items || [];

        if (items) {
            var newFormData = {};
            for (var key in initialFormState) {newFormData[key] = items[0][key];}
            setFormData(newFormData);
        }
    }

    function save() {
        saveRoutine(formData);
        console.log('save', formData);
        history.push('/backend/dashboard')
    }

    function clear() {
        setFormData(initialFormState);
        saveRoutine(formData);
    }

    return (
        <Container>
            <Button onClick={clear} size="tiny" className="add-button" floated="right">Clear</Button>
            <Button onClick={save} size="tiny" className="add-button" floated="right">Save</Button>
            <BC link="/backend/exercises" first="Exercise" active="Routines" />
            <p>Create a weekly routine by listing the exercises you want to do on a particular day.</p>

            <Form className="edit-routine-form">
                { Object.keys(initialFormState).map(key =>
                    <Form.Field key={key}>
                        <Form.TextArea
                        label={ StringHelper.ucFirst(key) }
                        autoComplete="off"
                        name={ key }
                        value={ formData[key] }
                        placeholder="example: Pushups, Pullups, Situps" 
                        onChange={e => setFormData({ ...formData, [key]: e.target.value})} />
                    </Form.Field>
                )}

                <Button onClick={save} size="tiny" className="add-button" floated="right">Save</Button>
            </Form>
        </Container>
    );
}
