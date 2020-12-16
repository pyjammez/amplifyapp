import React, { useState, useEffect } from 'react';
import { createItem, deleteItem } from './helpers/ApiHelpers';
import DateHelper from './helpers/DateHelper';
import StringHelper from './helpers/StringHelper';
import { FormGroup, FInput, DateTime, SaveAndDelete } from './helpers/FormHelpers';
import { Container, Form } from 'semantic-ui-react';
import { useParams, useLocation } from 'react-router-dom';
import { BC } from './helpers/BreadcrumbHelper';
import { API } from 'aws-amplify';
import { getItem } from './graphql/queries';
import { useHistory } from "react-router-dom";

export default function ItemNew(props) {
    var date = new Date();
    let history = useHistory();
    let { routePar, id } = useParams();
    const routeData = props.p[routePar];
    var initialFormState = {
        name: '',
        section: routeData.section,
        var1: '',
        var2: '',
        var3: '',
        date: DateHelper.date(date),
        time: DateHelper.time(date)
    }

    // pre populate name
    let { search } = useLocation();
    const name = new URLSearchParams(search).get('name');
    if (name) initialFormState['name'] = name;
 
    const [formData, setFormData] = useState(initialFormState);

    async function fetchItem(id) {
        if (!id) return;
        const apiData = await API.graphql({ query: getItem, variables: {id: id}});
        let i = apiData.data.getItem;

        let newFormData = {
            id:   i['id'],
            name: i['name'],
            var1: i['var1'],
            var2: i['var2'],
            var3: i['var3'],
            date: i['datetime'].substring(0,10),
            time: i['datetime'].substring(11,19)
        };

        setFormData(newFormData)
    }

    useEffect(() => {
        fetchItem(id);
    }, []);

    function create(action) {
        if (!formData.name) return;
        createItem(formData);
        if (action === "stay") setFormData(initialFormState);
        if (action === "list") history.push('/backend/' + routeData.section)
        if (action === "back") history.goBack();
    }

    function deleteAndReturn() {
        deleteItem({id: id});
        history.goBack();
    }

    var f = {formData: formData, setFormData: setFormData};

    return (
        <Container>
            <BC link={`/backend/${ routeData.section }`} 
                first={ StringHelper.ucFirst(routeData.section) }
                active={ (id ? "Edit " : "New ") + StringHelper.ucFirst(routeData.section) } />

            <Form className="edit-item-form">
                <FInput name="name" label="Name" f={f} />

                { routeData.route == "exercises" ?
                    <FormGroup f={f} var1Label="Reps / Distance" var2Label="Weight / Time" />
                : routeData.route == "diet" ?
                    <FormGroup f={f} var1Label="Carbs" var2Label="Protein" var3Label="Fat" />
                : routeData.route == "measurements" ?
                    <FormGroup f={f} var1Label="Units" />
                : routeData.route == "supplements" ?
                    <FormGroup f={f} var1Label="Servings/Volumn" />
                : routeData.route == "injuries" ?
                    <FormGroup f={f} var1Label="Description" />
                : routeData.route == "illness" ?
                    <FormGroup f={f} var1Label="Description" />
                : routeData.route == "photos" ?
                    <FormGroup f={f} var1Label="Url" />
                : "" }

                <DateTime f={f} />

                <SaveAndDelete create={create} deleteAndReturn={deleteAndReturn} action={ id ? "Edit" : "New"} />
            </Form>
        </Container>
    );
}
