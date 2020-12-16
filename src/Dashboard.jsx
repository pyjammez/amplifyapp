import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Segment, Header } from 'semantic-ui-react';
import { SectionHeader } from './helpers/UI';
import LatestWidget from './LatestWidget';

export default function Dashboard(props) {
    return (
        <Container className="Dashboard">
            <Header as="h3" >Dashboard</Header>

            { Object.values(props.p).map((s) =>
                <Segment key={ s.section } className="border-with-shadow w100 mb-30">
                    <SectionHeader
                        name={ s.name }
                        route={ s.route }
                        section={ s.section }
                        description={ s.description}
                        new
                        plan
                        latest
                    />
                {/*<LatestWidget route={ s.route } section={ s.section } limit="6" />*/}
                </Segment>
            ) }
        </Container>
    )
}
