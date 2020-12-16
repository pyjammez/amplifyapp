import React, { Component } from 'react';
import { Redirect, Link, useLocation } from 'react-router-dom';
import { Segment, Sidebar, Menu, Icon } from 'semantic-ui-react';
import { Auth } from 'aws-amplify';
import StringHelper from './helpers/StringHelper';

const ParentRouteLink = ({ component: Component, ...rest }) => {
    const location = useLocation();
    const paths = location.pathname.split('/');

    var pathName = (paths[2]) ? StringHelper.ucFriendly(paths[2]) : "Welcome";
    var pathLink = (paths[2]) ? "/" + paths[1] + "/" + paths[2] : "/";
    if (pathName == "Dashboard") return <div />

    return <Menu.Item as={Link} to={ pathLink }>{ pathName }</Menu.Item>
}

export default class Header extends Component {
    constructor(props)  {
        super(props);

        this.state = {
            leftSidebarOpened: false,
            dimmed: false,
        }
    }

    signOut = async(e) => {
        e.preventDefault();
        Auth.signOut()
            .then(() => {
                return <Redirect to="/" />
            })
            .catch(err => console.log(err));
    }

    handlePusherClick = () => {
        if (this.state.leftSidebarOpened || this.state.rightSidebarOpened) this.setState({
            leftSidebarOpened: false,
            rightSidebarOpened: false,
            dimmed: false
        })
    }

    handleToggle = () => {
        this.setState({
            leftSidebarOpened: !this.state.leftSidebarOpened,
            dimmed: !this.state.leftSidebarOpened,
            rightSidebarOpened: false
        })
    }

    handleAdminToggle = () => {
        this.setState({
            rightSidebarOpened: !this.state.rightSidebarOpened,
            dimmed: !this.state.rightSidebarOpened,
            leftSidebarOpened: false
        })
    }

    render() {
        return (
            <div>
                <Segment inverted textAlign='center' style={{padding: '0'}} vertical>
                    <Menu inverted className="fixed-header-nav" borderless pointing size='large'>
                        <Menu.Item onClick={this.handleToggle}>
                            <Icon size="large" name='sidebar' />
                        </Menu.Item>

                        <Menu.Item as={Link} to="/backend/dashboard">
                            <Icon size="large" name='home' />
                        </Menu.Item>

                        <ParentRouteLink />

                        <Menu.Menu position='right'>
                            {this.state.actions}

                            <Menu.Item onClick={this.handleAdminToggle}>
                                <Icon size="large" name="ellipsis vertical" />
                            </Menu.Item>
                        </Menu.Menu>
                    </Menu>
                </Segment>

                <Sidebar as={Menu} inverted vertical onClick={this.handlePusherClick}
                    visible={this.state.leftSidebarOpened}
                    size="massive" >
                    <Menu.Item as={Link} to="/backend/dashboard">Dashboard</Menu.Item>
                    <Menu.Item as={Link} to="/backend/exercises">Exercise</Menu.Item>
                    <Menu.Item as={Link} to="/backend/diet">Diet</Menu.Item>
                    <Menu.Item as={Link} to="/backend/measurements">Measurements</Menu.Item>
                    <Menu.Item as={Link} to="/backend/supplements">Supplements</Menu.Item>
                    <Menu.Item as={Link} to="/backend/progress-photos">Photos</Menu.Item>
                    <Menu.Item as={Link} to="/backend/injuries">Injuries</Menu.Item>
                    <Menu.Item as={Link} to="/backend/illness">Illness</Menu.Item>
                    <Menu.Item as={Link} to="/backend/all">All</Menu.Item>
                    <Menu.Item as={Link} to="/">Welcome Page</Menu.Item>
                </Sidebar>

                <Sidebar as={Menu} inverted vertical
                    direction="right"
                    onClick={this.handlePusherClick}
                    visible={this.state.rightSidebarOpened}
                    size="massive" >
            {/*
                    <Menu.Item as={Link} to="/backend/dashboard-settings">Dashboard Settings</Menu.Item>
                    <Menu.Item as={Link} to="/backend/unit-settings">Unit Settings</Menu.Item>
                    <Menu.Item as={Link} to="/backend/date-time-settings">Date Time Settings</Menu.Item>
                    <Menu.Item as={Link} to="/backend/analyse-mode">Analyse</Menu.Item>
                    <Menu.Item as={Link} to="/backend/change-email">Change Email</Menu.Item>
                    <Menu.Item as={Link} to="/backend/change-password">Change Password</Menu.Item>
                    <Menu.Item as={Link} to="/backend/upgrade-to-pro">Upgrade to Pro</Menu.Item>
                    <Menu.Item as={Link} to="/backend/send-feedback">Send Feedback</Menu.Item>
                    <Menu.Item as={Link} to="/backend/request-feature">Request Feature</Menu.Item>
                    <Menu.Item as={Link} to="/backend/report-bug">Report Bug</Menu.Item>
            */}
                    <Menu.Item onClick={this.signOut} as={Link} to="/">Logout</Menu.Item>
                </Sidebar>
            </div>
        );
    }
}
