import React, { Component } from 'react';
import { Form, Checkbox, Container } from 'semantic-ui-react';
import { API } from 'aws-amplify';

export default class DateTimeSettings extends Component {
    constructor(props)  {
        super(props);
        
        this.state = {
            twelvehour: "",
            dateformat: "",
            saved: false,
            loading: false
        }
    }
/* 
    componentDidMount() {
        window.breadcrumbs([
            ['/datetime-settings', 'Date Time Settings'],
        ]);

        window.actions([]);
    }
*/
    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value }, () => {
            if (name === "twelvehour") {
                this.updateHour(e);
            } else if (name === "dateformat") {
                this.updateFormat(e);
            }
        });
    }

    updateHour = async (event) => {
        event.preventDefault();
        this.setState({loading: true});

        let requestParams = {
            body : {
                'twelvehour': this.state.twelvehour,
            }
        }

        API.post('ReactSample','/items/profile', requestParams)
            .then(data => {
                sessionStorage.setItem('twelvehour', this.state.twelvehour);
            })
            .catch (err => console.log(err))
    }

    updateFormat = async (event) => {
        event.preventDefault();
        this.setState({loading: true});

        let requestParams = {
            body : {
                'dateformat': this.state.dateformat,
            }
        }

        API.post('ReactSample','/items/profile', requestParams)
            .then(data => {
                sessionStorage.setItem('dateformat', this.state.dateformat);
            })
            .catch (err => console.log(err))
    }

    componentWillReceiveProps(nextProps) {
        this.fetch();
    }

    fetch = async () => {
        this.setState({loading: true});

        API.get('ReactSample','/items/profile')
            .then(resp => {
                resp = resp['Item'];

                this.setState({
                    loading: false,
                    twelvehour: resp.twelvehour,
                    dateformat: resp.dateformat,
                });
            })
            .catch (err => {console.log(err)})
    }

    render() {
        return (
            <div>
                <header>
                    <Container>
                        <p>Date and time display format</p>
                    </Container>
                </header>

                <Container>
                    <Form>
                        <p>12 hour or 24 hour?</p>

                        <Form.Field>
                            <Checkbox
                                radio
                                label='24 hour'
                                name='twelvehour'
                                value='24'
                                checked={this.state.twelvehour === 24}
                                onChange={this.handleChange}
                                />
                        </Form.Field>

                        <Form.Field>
                            <Checkbox
                                radio
                                label='12 hour'
                                name='twelvehour'
                                value='12'
                                checked={this.state.twelvehour === 12}
                                onChange={this.handleChange}
                                />
                        </Form.Field>

                        <p>How do you want your dates to look?</p>

                        <Form.Field>
                            <Checkbox
                                radio
                                label='2018-12-22'
                                name='dateformat'
                                value='date'
                                checked={this.state.dateformat === 'date'}
                                onChange={this.handleChange}
                                />
                        </Form.Field>

                        <Form.Field>
                            <Checkbox
                                radio
                                label='12-22-2018'
                                name='dateformat'
                                value='american'
                                checked={this.state.dateformat === 'american'}
                                onChange={this.handleChange}
                                />
                        </Form.Field>

                        <Form.Field>
                            <Checkbox
                                radio
                                label='22-12-2018'
                                name='dateformat'
                                value='australian'
                                checked={this.state.dateformat === 'australian'}
                                onChange={this.handleChange}
                                />
                        </Form.Field>

                        <Form.Field>
                            <Checkbox
                                radio
                                label='Sat 22nd Dec 2018'
                                name='dateformat'
                                value='dayfirst'
                                checked={this.state.dateformat === 'dayfirst'}
                                onChange={this.handleChange}
                                />
                        </Form.Field>
                    </Form>
                </Container>
            </div>
        );
    }
}
