import React, { Component } from 'react';
import { Form, Checkbox, Container } from 'semantic-ui-react';

export default class DashboardSettings extends Component {
    constructor(props)  {
        super(props);
        
        this.state = {
            showExercise: false,
            showDiet: false,
            showMeasurements: false,
            showSupplements: false,
            showPhotos: false
            // showInjuries: "" <-- not important just yet
            // showMedication: "" <-- could this be part of supplements? ..
        }
    }

    handleChange = (event, {name}) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        this.setState({ [name]: value}, ()=>{
        });
    }

    render() {
        return (
            <div>
                <header>
                    <Container>
                        <p>What do you want the dashboard to look like?</p>
                    </Container>
                </header>

                <Container>

                    <Form>
                        <Form.Field>
                            <Checkbox name="showExercise" onChange={this.handleChange} checked={this.state.showExercise} label="Show Exercise on Dash" />
                        </Form.Field>
                        
                        <Form.Field>
                           <Checkbox name="showDiet" onChange={this.handleChange} checked={this.state.showDiet} label="Show Diet on Dash" />
                        </Form.Field>
                
                        <Form.Field>
                            <Checkbox name="showMeasurements" onChange={this.handleChange} checked={this.state.showMeasurements} label="Show Measurements on Dash" />
                        </Form.Field>
                    
                        <Form.Field>
                            <Checkbox name="showSupplements" onChange={this.handleChange} checked={this.state.showSupplements} label="Show Supplements on Dash" />
                        </Form.Field>
                    
                        <Form.Field>
                            <Checkbox name="showPhotos" onChange={this.handleChange} checked={this.state.showPhotos} label="Show Photos on Dash" />
                        </Form.Field>
                    </Form>
                </Container>
            </div>
        );
    }
}
