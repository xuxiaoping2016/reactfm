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
import Counter from 'bundle-loader?lazy&name=counter!pages/Counter/Counter'
import ContextDemo from 'bundle-loader?lazy&name=context!pages/context';
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
        <Route component={createComponent(NotFound)}/>
    </Switch>
);

export default getRouter;