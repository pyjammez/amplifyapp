import React, { useState, useEffect } from 'react';
import { createItem, deleteItem } from './helpers/ApiHelpers';
import { FInput, DateTime, SaveAndDelete } from './helpers/FormHelpers';
import { Container, Form } from 'semantic-ui-react';
import { useParams, useLocation } from 'react-router-dom';
import { BC } from './helpers/BreadcrumbHelper';
import { API } from 'aws-amplify';
import { getItem } from './graphql/queries';
import { useHistory } from "react-router-dom";


export default function ExercisesNew() {
    var date = new Date().toISOString();
    let history = useHistory();
    let { id } = useParams();
    let { search } = useLocation();
    var initialFormState = {
        name: '',
        section: 'exercise',
        var1: '',
        var2: '',
        date: date.substring(0,10),
        time: date.substring(11,19)
    }

    const params = new URLSearchParams(search);
    const name = params.get('name');

    if (name) {
        initialFormState['name'] = name;
    }
 
    const [action, setAction] = useState('');
    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        if (id) {
            fetchItem();
            setAction('Edit');
        } else {
            setAction('Add');
        }
    });

    async function fetchItem() {
        const apiData = await API.graphql({ query: getItem, variables: {id: id}});

        let i = apiData.data.getItem;

        let newFormData = {
            name: i['name'],
            var1: i['var1'],
            var2: i['var2'],
            date: i['datetime'].substring(0,10),
            time: i['datetime'].substring(11,19)
        };

        setFormData(newFormData)
    }

    function create(action) {
        if (!formData.name) return;

        createItem(formData);

        if (action === "stay") setFormData(initialFormState);
        if (action === "list") history.push('/backend/exercises')
        if (action === "back") history.goBack();
    }

    function deleteAndReturn() {
        deleteItem({id: id});
        history.goBack();
    }

    var f = {formData: formData, setFormData: setFormData};

    return (
        <Container>
            <BC link="/backend/exercises" first="Exercise" active={ action } />

            <Form className="edit-item-form">
                <FInput name="name" label="Name" f={f} />

                <Form.Group>
                    <FInput name="var1" label="Reps / Distance" f={f} />
                    <FInput name="var2" label="Weight / Time" f={f} />
                </Form.Group>

                <DateTime f={f} />

                <SaveAndDelete create={create} deleteAndReturn={deleteAndReturn} action={action} />
            </Form>
        </Container>
    );
}
