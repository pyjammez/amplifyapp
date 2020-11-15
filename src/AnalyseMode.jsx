import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

export default class AnalyseMode extends Component {
    handleChange = (e, { value }) => this.setState({ value })

    render() {
        return (
            <Container>
                Analyse mode will start with the click of a button, then go through a hundred processes of analysing all the stats to find patterns and show any interesting discoveries with advice. eg: Stats show that when you eat over 150grams of protein per day you make higher gains in all exercises. Or after eating pancakes for breakfast you run further each time. Or after a particular supplement, only one exercise is seeing an improvement. Or after one low calorie day you tend to eat less all week.
            </Container>
        );
    }
}
