import React, { useState, useEffect } from 'react';
import { saveRoutine } from './helpers/ApiHelpers';
import { Container, Form } from 'semantic-ui-react';
//import { API, Auth } from 'aws-amplify';
//import { getRoutinesByOwnerByCreatedAt } from './graphql/queries';
import { useHistory, useParams } from 'react-router-dom';
import StringHelper from './helpers/StringHelper';
import { SectionHeader } from './helpers/UI';

export default function ItemSettings(props) {
    let { routePar } = useParams();
    let history = useHistory();
    const routeData = props.p[routePar];
    const initialFormState = {
        // settings here
    }

    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        fetchRoutine();
    }, []);

    async function fetchRoutine() {
        //const { username: owner } = await Auth.currentAuthenticatedUser();
    }

    function save() {
        //saveSettings(formData);
        console.log('save', formData);
        history.push('/backend/dashboard')
    }

    function reset() {
        setFormData(initialFormState);
        //saveSettings(formData);
    }

    return (
        <Container>
            <SectionHeader
                name="Settings"
                route={ routeData.route }
                save={ save }
                reset={ reset }
            />
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
