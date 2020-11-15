import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

export default class RequestFeature extends Component {
    handleChange = (e, { value }) => this.setState({ value })

    render() {
        return (
            <Container>
                A form for users to request features. Perhaps a log of all requests features so they can see what is being worked on and highest priorities and highest votes.
            </Container>
        );
    }
}
