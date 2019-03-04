import React from 'react';
import Bundle from './Bundle';
import {Route, Switch} from 'react-router-dom';

import Loading from 'components/Loading/Loading.jsx'
import Home from 'bundle-loader?lazy&name=home!pages/Home/Home';
import Thought from 'bundle-loader?lazy&name=thought!pages/Thought';
import ErrorBoundaries from 'bundle-loader?lazy&name=errorBoundaries!pages/errorBoundaries';
import Refs from 'bundle-loader?lazy&name=refs!pages/refs';
import Fragments from 'bundle-loader?lazy&name=fragment!pages/fragment';
import Mixins from 'bundle-loader?lazy&name=mixin!pages/mixins';
import Hoc from 'bundle-loader?lazy&name=hoc!pages/hoc';
import Cooperation from 'bundle-loader?lazy&name=cooperation!pages/cooperation';
import Jsx from 'bundle-loader?lazy&name=jsx!pages/jsx';
import Performance from 'bundle-loader?lazy&name=performance!pages/performance';
import Portals from 'bundle-loader?lazy&name=portals!pages/portals';
import WithoutEs6 from 'bundle-loader?lazy&name=withoutEs6!pages/withoutEs6';
import WithoutJsx from 'bundle-loader?lazy&name=withoutJsx!pages/withoutJsx';
import Reconciliation from 'bundle-loader?lazy&name=reconciliation!pages/reconciliation';
import RenderProps from 'bundle-loader?lazy&name=renderProps!pages/renderProps';
import StaticTypeChecking from 'bundle-loader?lazy&name=staticTypeChecking!pages/staticTypeChecking';

import StrictMode from 'bundle-loader?lazy&name=strictMode!pages/strictMode';
import PropTypes from 'bundle-loader?lazy&name=propTypes!pages/propTypes';
import UncontrolledCom from 'bundle-loader?lazy&name=uncontrolledCom!pages/uncontrolledCom';
import WebComponents from 'bundle-loader?lazy&name=webComponents!pages/webComponents';

import ApiReact from 'bundle-loader?lazy&name=apireact!pages/apiReact';

import Counter from 'bundle-loader?lazy&name=counter!pages/Counter/Counter'
import ContextDemo from 'bundle-loader?lazy&name=context!pages/context';
import HooksDemo from 'bundle-loader?lazy&name=hooks!pages/hooks';
import Motions from 'bundle-loader?lazy&name=motions!pages/motion';
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
        <Route path="/thought" component={createComponent(Thought)}/>
        <Route path="/counter" component={createComponent(Counter)}/>
        <Route path="/context" component={createComponent(ContextDemo)}/>
        <Route path="/errorBoundaries" component={createComponent(ErrorBoundaries)} />
        <Route path="/refs" component={createComponent(Refs)} />
        <Route path="/fragment" component={createComponent(Fragments)} />
        <Route path="/mixins" component={createComponent(Mixins)} />
        <Route path="/hoc" component={createComponent(Hoc)} />
        <Route path="/cooperation" component={createComponent(Cooperation)} />
        <Route path="/jsx" component={createComponent(Jsx)} />
        <Route path="/performance" component={createComponent(Performance)} />
        <Route path="/portals" component={createComponent(Portals)} />
        <Route path="/withoutes6" component={createComponent(WithoutEs6)} />
        <Route path="/withoutjsx" component={createComponent(WithoutJsx)} />
        <Route path="/reconciliation" component={createComponent(Reconciliation)} />
        <Route path="/renderprops" component={createComponent(RenderProps)} />
        <Route path="/statictypechecking" component={createComponent(StaticTypeChecking)} />
        <Route path="/strictmode" component={createComponent(StrictMode)} />
        <Route path="/propTypes" component={createComponent(PropTypes)} />
        <Route path="/uncontrolledcom" component={createComponent(UncontrolledCom)} />
        <Route path="/webcomponents" component={createComponent(WebComponents)} />
        <Route path="/apireact" component={createComponent(ApiReact)} />
        <Route path="/hooks" component={createComponent(HooksDemo)} />
        <Route path="/motions" component={createComponent(Motions)} />
        <Route component={createComponent(NotFound)}/>
    </Switch>
);

export default getRouter;