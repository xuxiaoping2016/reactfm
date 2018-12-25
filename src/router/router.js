import React from 'react';
import Bundle from './Bundle';
import {Route, Switch} from 'react-router-dom';

import Loading from 'components/Loading/Loading.jsx'
import Home from 'bundle-loader?lazy&name=home!pages/Home/Home';
import Page1 from 'bundle-loader?lazy&name=page1!pages/Page1/Page1';
import StockManage from 'bundle-loader?lazy&name=stockManage!pages/stockManage/views'
import UserInfo from 'bundle-loader?lazy&name=userinfo!pages/UserInfo/UserInfo';
import Drag from 'bundle-loader?lazy&name=drag!pages/drag/index.jsx';
import ClassNamesDemo from 'bundle-loader?lazy&name=clasname!pages/classname/index.jsx';
import Animate from 'bundle-loader?lazy&name=animate!pages/animate/index.jsx';
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
        <Route path="/page1/:id" component={createComponent(Page1)}/>
        <Route path="/stockManage" component={createComponent(StockManage)}/>
        <Route path="/userinfo" component={createComponent(UserInfo)}/>
        <Route path="/drag" component={createComponent(Drag)}/>
        <Route path="/classname" component={createComponent(ClassNamesDemo)}/>
        <Route path="/animate" component={createComponent(Animate)}/>
        <Route path="/ceshilocation" render={(location) => {
            console.log(location);
            return <div>fdfdfd</div>
        }}/>
        <Route component={createComponent(NotFound)}/>
    </Switch>
);

export default getRouter;