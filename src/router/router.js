import React from 'react';
import Bundle from './Bundle';
import {Route,IndexRedirect,Router, browserHistory} from 'react-router';

import Loading from 'components/Loading/Loading.jsx'
import App from 'components/App/App.jsx'
import Home from 'pages/Home/Home';
import Page1 from 'pages/Page1/Page1';
import Counter from 'pages/Counter/Counter'
import UserInfo from 'pages/UserInfo/UserInfo';
import NotFound from 'pages/NotFound/NotFound.jsx';


// https://blog.csdn.net/qq_27626333/article/details/76228578
// const Page1 = (location,cb) => 
//     require.ensure([], (require) => cb(require('pages/Page1/Page1').default),'page1')
// const Counter = (location,cb) => 
//     require.ensure([], (require) => cb(require('pages/Counter/Counter').default),'counter')

// const UserInfo =(location,cb) => 
//     require.ensure([], (require) => cb(require('pages/UserInfo/UserInfo').default), 'userinfo')
// const NotFound = (location,cb) => 
//     require.ensure([], (require) => cb(require('pages/NotFound/NotFound.jsx').default), 'notfound')

// function getComponent(Com){
//     console.log(Com.default)
//     return Com.default
// }


const getRouter = () => (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRedirect to="home" />
            <Route path="/home" component={Home}/>
            <Route path="/page1" component={Page1}/>
            <Route path="/counter" component={Counter}/>
            <Route path="/userinfo" component={UserInfo}/>
            {/* <Route path="page1" getComponent={Page1}/> */}
        </Route>
    </Router>
);

export default getRouter;