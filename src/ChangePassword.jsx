import React, { Component } from 'react';
import { Form, Message, Container, Header, Button } from 'semantic-ui-react';
import { Auth } from 'aws-amplify';

export default class ChangePassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            oldPassword: '',
            newPassword: '',
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
                return Auth.changePassword(user, this.state.oldPassword, this.state.newPassword);
            })
            .then(data => {
                this.setState({loading: false, success: true, oldPassword: '', newPassword: ''});
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
                <Header as='h2' icon='lock' content='Change your password' />
                <p>Password Requirements: At least 6 characters in length.</p>

                { this.state.success ?
                    <Message positive>
                        <Message.Header>Password Updated</Message.Header>
                        <p>Don't forget it!</p>
                    </Message>
                : "" }

                { this.state.error ?
                    <Message error>
                        <Message.Header>Oopsy Daisy</Message.Header>
                        <p>{ this.state.error }</p>
                    </Message>
                : "" }

                <Form loading={this.state.loading} onSubmit={this.handleSubmit.bind(this)}>
                    <Form.Input type="password" label="Old Password" value={this.state.oldPassword} onChange={this.handleChange} name="oldPassword" placeholder="Old Password" />

                    <Form.Input type="password" label="New Password" value={this.state.newPassword} onChange={this.handleChange} name="newPassword" placeholder="New Password" />

                    <Button primary>Update</Button>
                </Form>
            </Container>
        );
    }
}
