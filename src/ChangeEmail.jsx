import React, { Component } from 'react';
import { Form, Message, Container, Header, Button } from 'semantic-ui-react';
import { Auth } from 'aws-amplify';

export default class ChangeEmail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            loading: false,
            success: false,
            err: ''
        };
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = async (event) => {
        event.preventDefault();
        this.setState({loading: true});

        Auth.currentAuthenticatedUser()
            .then(user => {
                return Auth.updateUserAttributes(user, {
                    'email': this.state.email
                });
            })
            .then(data => {
                this.setState({loading: false, success: true, email: ''});
                console.log(data)
            })
            .catch(err => {
                this.setState({loading: false, success: false, error: err.message});
                console.log(err)
            });
    }

    render() {
        return (
            <Container style={{marginTop: '30px'}}>
                <Header as='h2' icon='at' content='Update your email address' />
                <p>After updating your email you'll be logged out and have to verify it with a code sent to your new email address.</p>

                { this.state.success ?
                    <Message positive>
                        <Message.Header>Email Updated</Message.Header>
                    </Message>
                : "" }

                { this.state.error ?
                    <Message error>
                        <Message.Header>Oopsy Daisy</Message.Header>
                        <p>{ this.state.error }</p>
                    </Message>
                : "" }

                <Form loading={this.state.loading} onSubmit={this.handleSubmit.bind(this)}>
                    <Form.Input label="New Email Address" value={this.state.email} onChange={this.handleChange} name="email" placeholder="New Email Address" />

                    <Button primary>Update</Button>
                </Form>
            </Container>
        );
    }
}
