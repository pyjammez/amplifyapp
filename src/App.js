import React from 'react'
import { Switch, BrowserRouter, Route } from 'react-router-dom'
import { AmplifyAuthenticator, AmplifySignUp } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';

const App = () => {
    const [authState, setAuthState] = React.useState();
    const [user, setUser] = React.useState();

    React.useEffect(() => {
        return onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState);
            setUser(authData);
        });
    }, []);

    return (
        <BrowserRouter>
            <PublicRoutes />

            <Switch>
                <Route path="/backend">
                    { authState === AuthState.SignedIn && user
                    ?
                    <PrivateRoutes />
                    :
                    <AmplifyAuthenticator className="amplify-authenticator" usernameAlias="email">
                        <AmplifySignUp
                            slot="sign-up"
                            usernameAlias="email"
                            formFields={[{
                                type: "email",
                                required: true,
                            }, {
                                type: "password",
                                required: true,
                            }]}
                        />
                    </AmplifyAuthenticator>
                    }
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default App
