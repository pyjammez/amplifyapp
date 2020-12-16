import React, { useState, useEffect } from 'react';
import { saveRoutine } from './helpers/ApiHelpers';
import { Container, Form, Button } from 'semantic-ui-react';
import { BC } from './helpers/BreadcrumbHelper';
import { API, Auth } from 'aws-amplify';
import { getRoutinesByOwnerByCreatedAt } from './graphql/queries';
import { useHistory } from "react-router-dom";
import StringHelper from './helpers/StringHelper';


export default function ExercisesSettings() {
    const initialFormState = {
        // settings here
    }

    const [formData, setFormData] = useState(initialFormState);

    let history = useHistory();

    useEffect(() => {
        fetchRoutine();
    }, []);

    async function fetchRoutine() {
        const { username: owner } = await Auth.currentAuthenticatedUser();
        /*
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
        */
    }

    function save() {
        //saveSettings(formData);
        console.log('save', formData);
        history.push('/backend/dashboard')
    }

    function clear() {
        setFormData(initialFormState);
        //saveSettings(formData);
    }

    return (
        <Container>
            <Button onClick={save} size="tiny" className="add-button" floated="right">Save</Button>
            <BC link="/backend/exercises" first="Exercise" active="Exercise Settings" />
            <p>Settings for the exercise section go here</p>
        {/*
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
        */}
        </Container>
    );
}
