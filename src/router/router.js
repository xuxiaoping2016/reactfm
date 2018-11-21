import React from 'react';
import {Route,IndexRedirect,Router, browserHistory} from 'react-router';

import Loading from 'components/Loading/Loading.jsx'
import App from 'components/App/App.jsx'
import Home from 'pages/Home/Home';
import Page1 from 'pages/Page1/Page1';
import Counter from 'pages/Counter/Counter'
import UserInfo from 'pages/UserInfo/UserInfo';
import NotFound from 'pages/NotFound/NotFound.jsx'
// const Page1 = (location,cb) =>
//     require.ensure([], (require) => cb(null,require('pages/Page1/Page1').default),'page1')
// const Counter = (location,cb) => 
//     require.ensure([], (require) => cb(null,require('pages/Counter/Counter').default),'counter')

// const UserInfo =(location,cb) => 
//     require.ensure([], (require) => cb(null,require('pages/UserInfo/UserInfo').default), 'userinfo')
// const NotFound = (location,cb) => 
//     require.ensure([], (require) => cb(null,require('pages/NotFound/NotFound.jsx').default), 'notfound')

export const getModule = (loader, exportName) => (nextState, cb) => loader(module => exportName
    ? cb(null, module[exportName])
    : cb(null, module))
    
const getRouter = () => (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRedirect to="home" />
            <Route path="/home" component={Home}/>
            {/* <Route path="/page1" getComponent={Page1}/>
            <Route path="/counter" getComponent={Counter}/>
            <Route path="/userinfo" getComponent={UserInfo}/>
            <Route path="/notfound" getComponent={NotFound}/> */}
            <Route path="/page1" getComponent={getModule(Page1)}/>
            <Route path="/counter" getComponent={getModule(Counter)}/>
            <Route path="/userinfo" getComponent={getModule(UserInfo)}/>
            <Route path="/notfound" getComponent={getModule(NotFound)}/>
        </Route>
    </Router>
);

export default getRouter;