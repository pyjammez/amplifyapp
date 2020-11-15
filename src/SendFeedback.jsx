import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

export default class SendFeedback extends Component {

    handleChange = (e, { value }) => this.setState({ value })

    render() {
        return (
            <Container>
            A feedback form.
            </Container>
        );
    }
}
