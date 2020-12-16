import React, { useState, useEffect } from 'react';
import { saveRoutine } from './helpers/ApiHelpers';
import { Header, Container, Form, Button } from 'semantic-ui-react';
import { BC } from './helpers/BreadcrumbHelper';
import { API, Auth } from 'aws-amplify';
import { getRoutinesByOwnerByCreatedAt } from './graphql/queries';
import StringHelper from './helpers/StringHelper';
import { useHistory, useParams } from 'react-router-dom';
import { SectionHeader } from './helpers/UI';

export default function ItemRoutineEdit(props) {
    let { routePar } = useParams();
    const routeData = props.p[routePar];

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
        history.push('/backend/dashboard')
    }

    function reset() {
        setFormData(initialFormState);
        saveRoutine(formData);
    }

    return (
        <Container>
            <SectionHeader
                name="Edit Plan"
                route={ routeData.route }
                section={ routeData.section }
                description="Prepare a weekly plan to maintain persistent progress."
                save={ save }
                reset={ reset }
            />

            <Form className="edit-routine-form">
                { Object.keys(initialFormState).map(key =>
                    <Form.Field key={key}>
                        <Form.TextArea
                        label={ StringHelper.ucFirst(key) }
                        autoComplete="off"
                        name={ key }
                        value={ formData[key] }
                        placeholder={
                            routeData.section === "exercise" ?
                                "example: Pushups, Pullups, Situps" 
                            : routeData.section === "diet" ?
                                "example: Glass of Juice, PB on Toast, Porridge, 2 Fried Eggs"
                            : "" }
                        onChange={e => setFormData({ ...formData, [key]: e.target.value})} />
                    </Form.Field>
                )}

                <Button onClick={save} size="tiny" className="add-button" floated="right">Save</Button>
            </Form>
        </Container>
    );
}
