import React, {  Suspense, lazy } from 'react';
import Bundle from './Bundle';
import {Route, Switch} from 'react-router-dom';
import Loading from 'components/Loading/Loading.jsx';

const Home = lazy(() => import('pages/Home/Home'));
const Page1 = lazy(() => import('pages/Page1/Page1'));
const Counter = lazy(() => import('pages/Counter/Counter'));
const UserInfo = lazy(() => import('pages/UserInfo/UserInfo'));
const TableList = lazy(() => import('pages/Table/index.jsx'));

const getRouter = () => (
    <Suspense fallback={<div>Loading . . . </div>}>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/page1" component={Page1}/>
            <Route path="/counter" component={Counter}/>
            <Route path="/userinfo" component={UserInfo}/>
            <Route path="/table" component={TableList}/>
        </Switch>
    </Suspense>
);

export default getRouter;