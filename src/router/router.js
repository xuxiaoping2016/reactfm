import React from 'react';
import Bundle from './Bundle';
import {Route, Switch} from 'react-router-dom';

import Loading from 'components/Loading/Loading.jsx'
import Home from 'bundle-loader?lazy&name=home!pages/Home/Home';
import ContextDemo from 'bundle-loader?lazy&name=context!pages/context';
import Page1 from 'bundle-loader?lazy&name=page1!pages/Page1/Page1';
import Counter from 'bundle-loader?lazy&name=counter!pages/Counter/Counter'
import UserInfo from 'bundle-loader?lazy&name=userinfo!pages/UserInfo/UserInfo';
import NotFound from 'bundle-loader?lazy&name=notFound!pages/NotFound/NotFound.jsx';


const createComponent = (Com) => (props) => (
    <Bundle load={Com}>
        {
            (Com) => Com ? <Com {...props} /> : <Loading/>
        }
    </Bundle>
);


const getRouter = () => (
    <Switch>
        <Route exact path="/" component={createComponent(Home)}/>
        <Route path="/context" component={createComponent(ContextDemo)}/>
        <Route path="/page1" component={createComponent(Page1)}/>
        {/* <Route path="/counter" component={createComponent(Counter)}/>
        <Route path="/userinfo" component={createComponent(UserInfo)}/>
        <Route component={createComponent(NotFound)}/> */}
    </Switch>
);

export default getRouter;