import React from 'react'
import { Header, Breadcrumb } from 'semantic-ui-react';
import DateTimeFormatter from './DateTimeFormatter';

export const BC = ({link, first, active}) =>
    <Breadcrumb>
        <Header as="h3">{ active }</Header>
    </Breadcrumb>

export const BCDate = ({date}) =>
    <Breadcrumb>
        <Header as="h3">
            <DateTimeFormatter value={ date } date />
        </Header>
    </Breadcrumb>

/*
export const BC = ({link, first, active}) => (
    <Breadcrumb>
        <Breadcrumb.Section as={Link} to={link}>{first}</Breadcrumb.Section>
        <Breadcrumb.Divider icon="right angle" />
        <Breadcrumb.Section active>{active}</Breadcrumb.Section>
    </Breadcrumb>
)*/
