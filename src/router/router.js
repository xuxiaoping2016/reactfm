import React from 'react';
import Bundle from './Bundle';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import Home from 'bundle-loader?lazy&name=home!pages/Home/Home.jsx';
import TodoView from 'bundle-loader?lazy&name=home!pages/tododemo'
import Order from 'bundle-loader?lazy&name=order!pages/order/index.jsx'
import DrivedState from 'bundle-loader?lazy&name=drivedState!pages/getDerivedStateFromProps/index.jsx'
import ContractNew from 'bundle-loader?lazy&name=contractnew!pages/contract/new/index'

import Affix from 'bundle-loader?lazy&name=affix!pages/affix/index.jsx'
import Hoc from 'bundle-loader?lazy&name=hoc!pages/hoc/index.jsx'

// import Transitiondemo from 'bundle-loader?lazy&name=transition!pages/transition/index'
import Transitiondemo from 'pages/transition/index.jsx'
import ReactMotion from '../pages/reactMotioin/index'
import LodashDemo from '../pages/lodash/index.jsx'

import CascaderDemo from '../pages/cascader/index.jsx'

// import MobxDemo from 'bundle-loader?lazy&name=mobxDemo!pages/mobxDemo'
// import MobxDemoChild1 from 'bundle-loader?lazy&name=mobxDemo!pages/mobxDemo/mobxDemo'
import MobxDemo from '../pages/mobxDemo'
import MobxDemoChild1 from '../pages/mobxDemo/mobxDemo'
import MobxDemoChild2 from '../pages/mobxDemo/observerInfo'
import MobxDemoProxy from '../pages/mobxDemo/proxy'

import InputCount from 'bundle-loader?&name=inputcount!pages/inputCount'
import CountDown from 'bundle-loader?&name=countdown!pages/statistic'


import Algorithm from 'bundle-loader?&name=algorithm!pages/algorithm'
// import Todo from '../../component/todolists/index'
// import Hello from '../../component/todolists/index2'
const Loading = function () {
    return <div>Loading...</div>
};

const createComponent = (Component) => (props) => (
    <Bundle load={Component}>
        {
            (Com) => Com ? <Com {...props} /> : <Loading/>
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
                <li><Link to="/reactMotion">ReactMotion 动画</Link></li>
                <li><Link to="/lodash">Lodash 源码学习</Link></li>
                <li><Link to="/cascader">Cascader 级联选择</Link></li>
                <li><Link to="/mobxdemo">mobx使用示例</Link></li>
                <li><Link to="/inputcount">输入框计数</Link></li>
                <li><Link to="/countdown">倒计时</Link></li>
                <li><Link to="/algorithm/bubbleSort">算法</Link></li>
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
                <Route path="/reactMotion" component={ReactMotion}/>
                <Route path="/lodash" component={LodashDemo}/>
                <Route path="/cascader" component={CascaderDemo}/>
                {/* <Route path="/mobxdemo" component={createComponent(MobxDemo)}/> */}
                <Route path="/mobxdemo" render = {() =>
                    <MobxDemo>
                        <Route path="/mobxdemo/child1" component={MobxDemoChild1}/>
                        <Route path="/mobxdemo/child2" component={MobxDemoChild2}/>
                        <Route path="/mobxdemo/proxy" component={MobxDemoProxy}/>
                    </MobxDemo>
                }/>
                <Route path="/inputcount" component={createComponent(InputCount)}/>
                <Route path="/countdown" component={createComponent(CountDown)}/>
                <Route path="/algorithm" component={createComponent(Algorithm)} />
            </Switch>
            </div>
        </div>
    </Router>
);

export default getRouter;