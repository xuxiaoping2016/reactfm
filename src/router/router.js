import React from 'react';

import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import Bundle from './Bundle';

import Home from 'bundle-loader?lazy&name=home!pages/Home/Home';
import TodoView from 'bundle-loader?lazy&name=home!pages/tododemo/TodoView'
import Order from 'bundle-loader?lazy&name=order!pages/order/index.jsx'
import DrivedState from 'bundle-loader?lazy&name=drivedState!pages/getDerivedStateFromProps/index'
import ContractNew from 'bundle-loader?lazy&name=contractnew!pages/contract/new/index'


// import Todo from '../../component/todolists/index'
// import Hello from '../../component/todolists/index2'

const Loading = function () {
    return <div>Loading...</div>
};

const createComponent = (component) => (props) => (
    <Bundle load={component}>
        {
            (Component) => Component ? <Component {...props} /> : <Loading/>
        }
    </Bundle>
);

const getRouter = () => (
    <Router>
        <div>
            <ul>
                <li><Link to="/">首页</Link></li>
                <li><Link to="/todo">TodoView</Link></li>
                <li><Link to="/order">order</Link></li>
                <li><Link to="/drivedState">DrivedState</Link></li>
                <li><Link to="/contract">ContractNew</Link></li>
            </ul>
            <Switch>
                <Route exact path="/" component={createComponent(Home)}/>
                <Route path="/todo" component={createComponent(TodoView)}/>
                <Route path="/order" component={createComponent(Order)}/>
                <Route path="/drivedState" component={createComponent(DrivedState)}/>
                <Route path="/contract" component={createComponent(ContractNew)}/>
            </Switch>
        </div>
    </Router>
);

export default getRouter;