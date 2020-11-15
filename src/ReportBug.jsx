import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

export default class ReportBug extends Component {

    handleChange = (e, { value }) => this.setState({ value })

    render() {
        return (
            <Container>
                A form for people to report bugs.
            </Container>
        );
    }
}
