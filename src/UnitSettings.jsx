import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Checkbox, Container } from 'semantic-ui-react';

export default class UnitSettings extends Component {
    constructor(props)  {
        super(props);
        
        this.state = {
            value: ""
        }
    }
 
    handleChange = (e, { value }) => this.setState({ value })

    render() {
        return (
            <div>
                <div className="nav-header">
                    <Link to="/unit-settings">Unit Settings</Link>
                </div>

                <header>
                    <Container>
                        <p>Preferred units of measurement</p>
                    </Container>
                </header>

                <Container>
                    <Form>
                        <Form.Field>
                            <Checkbox
                                radio
                                label='Imperial'
                                name='checkboxRadioGroup'
                                value='imperial'
                                checked={this.state.value === 'imperial'}
                                onChange={this.handleChange}
                                />
                        </Form.Field>

                        <Form.Field>
                            <Checkbox
                                radio
                                label='Metric'
                                name='checkboxRadioGroup'
                                value='metric'
                                checked={this.state.value === 'metric'}
                                onChange={this.handleChange}
                                />
                        </Form.Field>
                    </Form>
                </Container>
            </div>
        );
    }
}
