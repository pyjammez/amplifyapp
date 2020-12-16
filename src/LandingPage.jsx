import React, { Component } from 'react';
import { Visibility, Segment, Menu, Grid, Form, Label, Card, Header, Container, Button, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

export default class LandingPage extends Component {
    state = {};

    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })

    render() {
        //const { children } = this.props
        const { fixed } = this.state

        return (
            <div>
                    <div className="landing-page">
                <Visibility
                  once={false}
                  onBottomPassed={this.showFixedMenu}
                  onBottomPassedReverse={this.hideFixedMenu}
                >
                  <Segment
                    inverted
                    textAlign='center'
                    style={{ padding: '80px 0 80px 0' }}
                    vertical
                  >
                    <Menu
                      fixed='top'
                      inverted={true}
                      pointing={true}
                      size='large'
                    >
                        <Container>
                            <Menu.Item as={ Link } to="/" active>Home</Menu.Item>
                            <Menu.Item as={ Link } to="/">Devices</Menu.Item>
                            <Menu.Item as={ Link } to="/">Testimonials</Menu.Item>
                            <Menu.Item as={ Link } to="/">Team</Menu.Item>
                            <Menu.Item position='right'>
                                  <Button as={ Link } to="/backend/dashboard">
                                        Dashboard
                                  </Button>
                            </Menu.Item>
                      </Container>
                    </Menu>

                      <Grid container stackable verticalAlign='middle' style={{paddingTop: '20px'}}>
                        <Grid.Row>
                          <Grid.Column width={8}>
                            <Header inverted as='h3' style={{ fontSize: '2em' }}>
                                Log Progress. See Insights. Optimize plan.
                            </Header>
                            <p style={{ fontSize: '1.33em' }}>
                                Fitness Statistics not only lets you record your progress, but provides
                                valuable insights into what you're doing right and wrong, allowing you
                                to optimize your plan to save time and speed up your progress!
                            </p>
                            
                            <div className="app-store-buttons">
                                <Label as='a' image>
                                  <img src='https://via.placeholder.com/40' alt="image1" />
                                  App Store
                                </Label>
                                
                                <Label as='a' image>
                                  <img src='https://via.placeholder.com/40' alt="image2" />
                                  Play Store
                                </Label>
                                
                                <Label as='a' image>
                                  <img src='https://via.placeholder.com/40' alt="image3" />
                                  Amazon Store
                                </Label>
                                
                                <Label as='a' image>
                                  <img src='https://via.placeholder.com/40' alt="image4" />
                                  Tizen Store
                                </Label>
                            </div>
                          </Grid.Column>
                          <Grid.Column floated='right' width={6}>
                            <Image bordered size='large' src='https://via.placeholder.com/400' />
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>


                </Segment>
            </Visibility>


                        {/* HOW TO USE IT */}
                        <Segment id="devices" vertical textAlign="center">
                            <Header as='h3' style={{ fontSize: '2em', marginBottom: '3em' }}>
                                Available on every device!
                            </Header>

                            <Image centered src='https://via.placeholder.com/800x300' />
                        </Segment>

                        {/* TESTIMONIALS */}
                        <Segment id="testimonials" vertical textAlign="center" inverted>
                            <Header as='h3' style={{ fontSize: '2em', marginBottom: '3em' }}>
                                Testimonials
                            </Header>

                            <Card.Group>
                                <Card style={{ margin: "0 auto" }}>
                                  <Card.Content>
                                    <Image floated='right' size='mini' src='https://via.placeholder.com/40' />
                                    <Card.Header>Steve Sanders</Card.Header>
                                    <Card.Meta>Friends of Elliot</Card.Meta>
                                    <Card.Description>
                                        I record my diet and weight and realised that Saturdays are the days I gain weight.
                                        By focusing my dieting efforts on Saturday only, I've lost 15lb only changing my
                                        eating on one day of the week.
                                    </Card.Description>
                                  </Card.Content>
                                  <Card.Content extra>
                                  </Card.Content>
                                </Card>

                                <Card style={{ margin: "0 auto" }}>
                                  <Card.Content>
                                    <Image floated='right' size='mini' src='https://via.placeholder.com/40' />
                                    <Card.Header>Molly Thomas</Card.Header>
                                    <Card.Meta>New User</Card.Meta>
                                    <Card.Description>
                                        I realised that the only weeks I make progress are the weeks I eat over 150 protein per day.
                                        Since adjusting my diet I'm making more progress every week than ever before.
                                    </Card.Description>
                                  </Card.Content>
                                  <Card.Content extra>
                                  </Card.Content>
                                </Card>

                                <Card style={{ margin: "0 auto" }}>
                                  <Card.Content>
                                    <Image floated='right' size='mini' src='https://via.placeholder.com/40' />
                                    <Card.Header>Jenny Lawrence</Card.Header>
                                    <Card.Meta>New User</Card.Meta>
                                    <Card.Description>
                                        I found a co-relation between how many deadlifts I do and my overall progress for the week.
                                        I started doing deadlifts daily and all progress has doubled every week!
                                    </Card.Description>
                                  </Card.Content>
                                  <Card.Content extra>
                                  </Card.Content>
                                </Card>
                            </Card.Group>
                        </Segment>

                        {/* ANALYSIS MODE */}
                        <Segment id="analysis" vertical>
                          <Grid container stackable verticalAlign='middle'>
                            <Grid.Row>
                              <Grid.Column width={8}>
                                <Header as='h3' style={{ fontSize: '2em' }}>
                                    Analysis Mode
                                </Header>
                                <p style={{ fontSize: '1.33em' }}>
                                    Using the latest in machine learning, we analyse your exercise and diet progress for
                                    patterns that indicate common problems and signs of good progress, allowing us to advise
                                    you on how to optimize your workout or diet to achieve greater results in less
                                    time.
                                </p>
                              </Grid.Column>
                              <Grid.Column floated='right' width={6}>
                                <Image bordered size='large' src='https://via.placeholder.com/400' />
                              </Grid.Column>
                            </Grid.Row>
                          </Grid>
                        </Segment>

                        {/* TEAM */}
                        <Segment id="team" inverted textAlign="center" vertical>
                            <Header as="h3" style={{ fontSize: '2em', marginBottom: "3em" }} textAlign="center">
                                Meet the Team
                            </Header>

                            <Card.Group>
                                <Card style={{ margin: "auto" }}>
                                    <Image size="small" src='https://via.placeholder.com/150' />
                                    
                                    <Card.Content>
                                        <Card.Header>Thomas Doan</Card.Header>
                                        
                                        <Card.Meta>
                                            <span className='date'>UI/UX/UI Developer</span>
                                        </Card.Meta>
                                    
                                        <Card.Description>I record my running and weight every day and being able to record these details on an app makes it
                                        so easy to stay on track and not worry about remembering what I did last.</Card.Description>
                                    </Card.Content>
                                </Card>

                                <Card style={{ margin: "auto" }}>
                                    <Image size="small" src='https://via.placeholder.com/150' />
                                    
                                    <Card.Content>
                                        <Card.Header>Matthew</Card.Header>
                                        
                                        <Card.Meta>
                                            <span className='date'>Front End Developer</span>
                                        </Card.Meta>
                                    
                                        <Card.Description>I record my weight and diet and didnt realise how my diet affected my weight until I looked a the graphs.</Card.Description>
                                    </Card.Content>
                                </Card>

                                <Card style={{ margin: "auto" }}>
                                    <Image size="small" src='https://via.placeholder.com/150' />
                                    
                                    <Card.Content>
                                        <Card.Header>James Hilton</Card.Header>
                                        
                                        <Card.Meta>
                                            <span className='date'>Lead Developer</span>
                                        </Card.Meta>
                                    
                                        <Card.Description>I record all my exercises and diet and it keeps me motivated being able to
                                        see it all at a glance and know I'm making progress and staying on track.</Card.Description>
                                    </Card.Content>
                                </Card>
                            </Card.Group>
                        </Segment>

                        {/* CONTACT US */}
                        <Segment id="contact-us" vertical>
                          <Container text>
                            <Header as='h3' style={{ fontSize: '2em', marginBottom: '3em' }}>
                                Feedback, Suggestions, Complaints
                            </Header>

                            <Form>
                                <Form.Field>
                                  <label>Name</label>
                                  <input placeholder='Name' />
                                </Form.Field>
                                <Form.Field>
                                  <label>Email</label>
                                  <input placeholder='Email' />
                                </Form.Field>
                                <Form.Field>
                                  <Form.TextArea label='Message' placeholder='Message' />
                                </Form.Field>
                                <Button type='submit'>Send Message</Button>
                            </Form>
                          </Container>
                        </Segment>
                    </div>
            </div>
        );
    }
}
