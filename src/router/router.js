import React from 'react';
import Loadable from 'react-loadable';
// import Loadable from '../utils/loadable'
import {Route, Switch} from 'react-router-dom';

import Loading from 'components/Loading/Loading.jsx'

const Home = Loadable({
    loader: () => import('pages/Home/Home'),
    loading: Loading,
  });

  const Page1 = Loadable({
    loader: () => import('pages/Page1/Page1'),
    loading: Loading,
  });

  const Counter = Loadable({
    loader: () => import('pages/Counter/Counter'),
    loading: Loading,
  });

  const UserInfo = Loadable({
    loader: () => import('pages/UserInfo/UserInfo'),
    loading: Loading,
  });

  const TableList = Loadable({
    loader: () => import('pages/Table/index.jsx'),
    loading: Loading,
  });

  const ContextStudy = Loadable({
    loader: () => import('pages/context/index.jsx'),
    loading: Loading,
  });

  const NotFound = Loadable({
    loader: () => import('pages/NotFound/NotFound.jsx'),
    loading: Loading,
  });



const getRouter = () => (
    <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/page1" component={Page1}/>
        <Route path="/counter" component={Counter}/>
        <Route path="/userinfo" component={UserInfo}/>
        <Route path="/table" component={TableList}/>
        <Route path="/context" component={ContextStudy}/>
        <Route component={NotFound}/>
        {/* <Route exact path="/" component={createComponent(Home)}/>
        <Route path="/page1" component={createComponent(Page1)}/>
        <Route path="/counter" component={createComponent(Counter)}/>
        <Route path="/userinfo" component={createComponent(UserInfo)}/>
        <Route component={createComponent(NotFound)}/> */}
    </Switch>
);

export default getRouter;