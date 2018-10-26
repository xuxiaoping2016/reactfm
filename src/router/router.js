import React from 'react';

import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import Bundle from './Bundle';

import Home from 'bundle-loader?lazy&name=home!pages/Home/Home';
import TodoView from 'bundle-loader?lazy&name=home!pages/tododemo/TodoView'
import Order from 'bundle-loader?lazy&name=order!pages/order/index.jsx'
import DrivedState from 'bundle-loader?lazy&name=drivedState!pages/getDerivedStateFromProps/index'
import ContractNew from 'bundle-loader?lazy&name=contractnew!pages/contract/new/index'

import Affix from 'bundle-loader?lazy&name=affix!pages/affix/index'
import Hoc from 'bundle-loader?lazy&name=hoc!pages/hoc/index'

// import Transitiondemo from 'bundle-loader?lazy&name=transition!pages/transition/index'
import Transitiondemo from 'pages/transition/index'

// import Todo from '../../component/todolists/index'
// import Hello from '../../component/todolists/index2'

const Loading = function () {
    return <div>Loading...</div>
};

const createComponent = (Component) => (props) => (
    <Bundle load={Component}>
        {
            (Component) => Component ? <Component {...props} /> : <Loading/>
        }
    </Bundle>
);

const getRouter = () => (
    <Router>
        <div style={{display:"flex"}}>
            <ul style={{width:"200px"}}>
                <li><Link to="/">首页</Link></li>
                <li><Link to="/todo">TodoView</Link></li>
                <li><Link to="/order">order</Link></li>
                <li><Link to="/drivedState">DrivedState</Link></li>
                <li><Link to="/contract">ContractNew</Link></li>
                <li><Link to="/affix">Affix  固钉</Link></li>
                <li><Link to="/hoc">react 高阶组件</Link></li>
                <li><Link to="/transitiondemo">react 动画</Link></li>
            </ul>
            <div style={{flex:1}}>
            <Switch >
                <Route exact path="/" component={createComponent(Home)}/>
                <Route path="/todo" component={createComponent(TodoView)}/>
                <Route path="/order" component={createComponent(Order)}/>
                <Route path="/drivedState" component={createComponent(DrivedState)}/>
                <Route path="/contract" component={createComponent(ContractNew)}/>
                <Route path="/affix" component={createComponent(Affix)}/>
                <Route path="/hoc" component={createComponent(Hoc)}/>
                {/* <Route path="/transitiondemo" component={createComponent(Transitiondemo)}/> */}
                <Route path="/transitiondemo" component={Transitiondemo}/>
            </Switch>
            </div>
        </div>
    </Router>
);

export default getRouter;