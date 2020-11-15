import React from 'react';
import { Link } from 'react-router-dom';
import {Grid, Container, Button, Segment, Icon } from 'semantic-ui-react';
import TodaysRoutine from './TodaysRoutine';

const DashboardQuickButtons = (props) => (
    <div className="dashboard-quick-buttons">
        {props.new &&
            <Button as={Link} icon to={`/backend/${props.section}/new`}>
                <Icon name="plus" />
            </Button>
        }

        {props.routine &&
            <Button as={Link} icon to={`/backend/${props.section}/routine`}>
                <Icon name="list" />
            </Button>
        }

        {props.settings &&
            <Button as={Link} icon to={`/backend/${props.section}/settings`}>
                <Icon name="ellipsis vertical" />
            </Button>
        }
    </div>
)

export default function Dashboard() {
    return (
        <Container className="Dashboard" style={{paddingTop: '30px'}}>
            <Grid stackable columns={2} >
                <Grid.Row>
                    <Grid.Column>
                        <Segment>
                            <Link to="/backend/exercises" className="segment-label">Exercises</Link>
                            <DashboardQuickButtons section="exercises" new routine settings />
                            <TodaysRoutine />

                            {/* put some stats or something here */}
                        </Segment>
                    </Grid.Column>

                    <Grid.Column>
                        <Segment>
                            <Link to="/backend/diet" className="segment-label">Diet</Link>
                            <DashboardQuickButtons section="diet" new routine settings />

                            {/* put some stats or something here */}
                        </Segment>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                        <Segment>
                            <Link to="/backend/measurements" className="segment-label">Measurements</Link>
                            <DashboardQuickButtons section="measurements" new routine settings />

                            {/* put some stats or something here */}
                        </Segment>
                    </Grid.Column>

                    <Grid.Column>
                        <Segment>
                            <Link to="/backend/supplements" className="segment-label">Supplements</Link>
                            <DashboardQuickButtons section="supplements" new routine settings />

                            {/* put some stats or something here */}
                        </Segment>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                        <Segment>
                            <Link to="/backend/progress-photos" className="segment-label">Progress Photos</Link>
                            <DashboardQuickButtons section="progress-photos" new />

                            {/* put some stats or something here */}
                        </Segment>
                    </Grid.Column>

                    <Grid.Column>
                        <Segment>
                            <Link to="/backend/injuries" className="segment-label">Injuries</Link>
                            <DashboardQuickButtons section="injuries" new />

                            {/* put some stats or something here */}
                        </Segment>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                        <Segment>
                            <Link to="/backend/illness" className="segment-label">Illness</Link>
                            <DashboardQuickButtons section="illness" new />

                            {/* put some stats or something here */}
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    );
}
