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
import All from './All';
import ItemHome from './ItemHome'
import ItemLatest from './ItemLatest'
import ItemNew from './ItemNew'
import ItemPlan from './ItemPlan'
import ItemPlanEdit from './ItemPlanEdit'
import ItemSettings from './ItemSettings'
import ItemByDate from './ItemByDate'
import ItemByName from './ItemByName'

const PrivateRoutes = () => {
    React.useEffect(() => {
        return onAuthUIStateChange((nextAuthState, authData) => { });
    }, []);

    const p = {
        exercises: {
            route: "exercises",
            section: "exercise",
            name: "Exercises",
            description: "Record sets/reps, distance/time"},
        diet: {
            route: "diet",
            section: "diet",
            name: "Diet",
            description: "Record macronutrient values"},
        supplements: {
            route: "supplements",
            section: "supplement",
            name: "Supplements",
            description: "Record what you take"},
        measurements: {
            route: "measurements",
            section: "measurement",
            name: "Measurements",
            description: "Record weight or tape measurements"},
        injuries: {
            route: "injuries",
            section: "injury",
            name: "Injuries",
            description: "Record injuries you sustain"},
        illness: {
            route: "illness",
            section: "illness",
            name: "Illness",
            description: "Record any illness you acquire"},
        photos: {
            route: "photos",
            section: "photo",
            name: "Progress Photos",
            description: "Record progress photos"},
    }

    let routes = {
        'dashboard': <Dashboard p={p} />,
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
        'all': <All />,
        ':routePar': <ItemLatest p={p} />,
        ':routePar/home': <ItemHome p={p} />,
        ':routePar/latest': <ItemLatest p={p} />,
        ':routePar/new': <ItemNew p={p} />,
        ':routePar/plan': <ItemPlan p={p} />,
        ':routePar/plan/edit': <ItemPlanEdit p={p} />,
        ':routePar/settings': <ItemSettings p={p} />,
        ':routePar/:id/edit': <ItemNew p={p} />,
        ':routePar/by-date/:datePar': <ItemByDate p={p} />,
        ':routePar/by-name/:namePar': <ItemByName p={p} />,
    };

    return (
        <div className="backend">
            <Header />

            <Switch>
                { Object.keys(routes).map(key =>
                    <Route key={key} path={"/backend/"+key} exact>{ routes[key] }</Route>
                )}
            </Switch>
        </div>
    )
}

export default PrivateRoutes;
