import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

export default class UpgradeToPro extends Component {
    handleChange = (e, { value }) => this.setState({ value })

    render() {
        return (
            <Container>
                guide on how to upgrade to the pro version with analyse mode
            </Container>
        );
    }
}
