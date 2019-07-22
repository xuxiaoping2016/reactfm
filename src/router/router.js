import React from 'react';
import Bundle from './Bundle';
import {Route, Switch} from 'react-router-dom';

import Loading from 'components/Loading/Loading.jsx'
import Home from 'bundle-loader?lazy&name=home!pages/Home/Home';
import Rx9 from 'bundle-loader?lazy&name=rx9!pages/rx9/index.jsx';
import Page1 from 'bundle-loader?lazy&name=page1!pages/Page1/Page1';
import Counter from 'bundle-loader?lazy&name=counter!pages/Counter/Counter'
import UserInfo from 'bundle-loader?lazy&name=userinfo!pages/UserInfo/UserInfo';
import NotFound from 'bundle-loader?lazy&name=notFound!pages/NotFound/NotFound.jsx';


const createComponent = (Com) => (props) => {
    console.log('dd',props)
    return (
        <Bundle load={Com}>
        {
            (Com) => Com ? <Com {...props} /> : <Loading/>
        }
        </Bundle>
    )
};


const getRouter = () => (
    <Switch>
        <Route exact path="/" component={createComponent(Home)}/>
        <Route path="/rxjs9" title="30" component={createComponent(Rx9)}/>
        <Route path="/rxjs10" title="31" component={createComponent(Home)}/>
        <Route path="/rxjs11" component={createComponent(Home)}/>
        <Route path="/page1" component={createComponent(Page1)}/>
        <Route path="/counter" component={createComponent(Counter)}/>
        <Route path="/userinfo" component={createComponent(UserInfo)}/>
        <Route component={createComponent(NotFound)}/>
    </Switch>
);

export default getRouter;