import React from 'react';
import { Route, Switch } from 'react-router-dom'
import { onAuthUIStateChange } from '@aws-amplify/ui-components';
import Header from './Header';

import Dashboard from './Dashboard';
import DashboardSettings from './DashboardSettings';
import UnitSettings from './UnitSettings';
import DateTimeSettings from './DateTimeSettings';
import AnalyseMode from './AnalyseMode';
import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';
import UpgradeToPro from './UpgradeToPro';
import SendFeedback from './SendFeedback';
import RequestFeature from './RequestFeature';
import ReportBug from './ReportBug';
import Exercises from './Exercises';
import ExercisesByDate from './ExercisesByDate';
import ExercisesByName from './ExercisesByName';
import ExercisesNew from './ExercisesNew';
import ExercisesRoutine from './ExercisesRoutine';
import Diet from './Diet';
import Measurements from './Measurements';
import Supplements from './Supplements';
import ProgressPhotos from './ProgressPhotos';
import Injuries from './Injuries';
import Illness from './Illness';
import All from './All';


const PrivateRoutes = () => {
    //const [authState, setAuthState] = React.useState();
    //const [user, setUser] = React.useState();

    React.useEffect(() => {
        return onAuthUIStateChange((nextAuthState, authData) => {
      //      setAuthState(nextAuthState);
      //      setUser(authData)
        });
    }, []);

    //let match = useRouteMatch();

    let routes = {
        'dashboard': <Dashboard />,
        'dashboard-settings': <DashboardSettings />,
        'unit-settings': <UnitSettings />,
        'date-time-settings': <DateTimeSettings />,
        'analyse-mode': <AnalyseMode />,
        'change-email': <ChangeEmail />,
        'change-password': <ChangePassword />,
        'upgrade-to-pro': <UpgradeToPro />,
        'send-feedback': <SendFeedback />,
        'request-feature': <RequestFeature />,
        'report-bug': <ReportBug />,
        'exercises': <Exercises />,
        'exercises/new': <ExercisesNew />,
        'exercises/routine': <ExercisesRoutine />,
        'exercises/:id/edit': <ExercisesNew />,
        'exercises/by-date/:datePar': <ExercisesByDate />,
        'exercises/by-name/:namePar': <ExercisesByName />,
        'diet': <Diet/>,
        'measurements': <Measurements/>,
        'supplements': <Supplements/>,
        'progress-photos': <ProgressPhotos/>,
        'injuries': <Injuries/>,
        'illness': <Illness/>,
        'all': <All />,
    };

    return (
        <div>
            <Header />

            <Switch>
                { Object.keys(routes).map(key =>
                    <Route key={key} path={"/backend/"+key} exact>{ routes[key] }</Route>
                )}
            </Switch>
        </div>
    );
}

export default PrivateRoutes;
