import React, { Suspense } from 'react';
import {Route, Switch} from 'react-router-dom';

import Loading from 'components/Loading/Loading.jsx';
const Home = React.lazy(() => import('pages/Home/Home'));
const Page1 = React.lazy(() => import('pages/Page1/Page1'));
const Counter = React.lazy(() => import('pages/Counter/Counter'));
const UserInfo = React.lazy(() => import('pages/UserInfo/UserInfo'));
const NotFound = React.lazy(() => import('pages/UserInfo/UserInfo'));


const getRouter = () => (
    <Suspense fallback={<Loading/>}>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/page1" component={Page1}/>
            <Route path="/counter" component={Counter}/>
            <Route path="/userinfo" component={UserInfo}/>
            <Route component={NotFound}/>
        </Switch>
    </Suspense>
);

export default getRouter;