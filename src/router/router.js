import React from 'react';
import {Route, Switch} from 'react-router-dom';
import loadable from './loadable'

const Home = loadable(() => import('pages/Home/Home'));
const Page1 = loadable(() => import('pages/Page1/Page1'));
const Counter = loadable(() => import('pages/Counter/Counter'));
const UserInfo = loadable(() => import('pages/UserInfo/UserInfo'));
const TableList = loadable(() => import('pages/Table/index.jsx'));
const TableList = loadable(() => import('pages/context/index.jsx'));
const NotFound = loadable(() => import('pages/NotFound/NotFound.jsx'));

const getRouter = () => (
    <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/page1" component={Page1}/>
        <Route path="/counter" component={Counter}/>
        <Route path="/userinfo" component={UserInfo}/>
        <Route path="/table" component={TableList}/>
        <Route path="/context" component={ContextStudy}/>
        <Route component={NotFound}/>
    </Switch>
);

export default getRouter;