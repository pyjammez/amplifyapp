import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import LandingPage from './LandingPage';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';

const PublicRoutes = () => {
    const [authState, setAuthState] = React.useState();
    const [user, setUser] = React.useState();

    React.useEffect(() => {
        return onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState);
            setUser(authData)
        });
    }, []);

    //const fixed = true;

    return (
        <div>
            <Switch>
                <Route exact path="/">
                    { authState === AuthState.SignedIn && user ? <Redirect to="/backend/dashboard" /> : <LandingPage /> }
                </Route>

                <Route exact path="/about"><h1>About Page</h1><p>Example of inline route content</p></Route>
            </Switch>
        </div>
    );
}

export default PublicRoutes;
