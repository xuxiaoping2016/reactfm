import React from 'react';
// import Bundle from './Bundle';
import {Route, Switch} from 'react-router-dom';

// import Loading from 'components/Loading/Loading.tsx'
import Home from '../pages/Home/Home';
// import Page1 from 'bundle-loader?lazy&name=page1!pages/Page1/Page1';
import Fanxing from '../pages/fanxing/index'
import IntersectionTypes from '../pages/IntersectionTypes/index'
import Enum from '../pages/enum/index'
// import UserInfo from 'bundle-loader?lazy&name=userinfo!pages/UserInfo/UserInfo';
import NotFound from '../pages/NotFound/NotFound';


// const createComponent = (Com) => (props) => (
//     <Bundle load={Com}>
//         {
//             (Com) => Com ? <Com {...props} /> : <Loading/>
//         }
//     </Bundle>
// );


const getRouter = () => (
    <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/fanxing" component={Fanxing}/>
        <Route path="/intersectiontypes" component={IntersectionTypes}/>
        <Route path="/enum" component={Enum}/>
        <Route component={NotFound}/>
        {/* <Route exact path="/" component={createComponent(Home)}/>
        <Route path="/page1" component={createComponent(Page1)}/>
        <Route path="/counter" component={createComponent(Counter)}/>
        <Route path="/userinfo" component={createComponent(UserInfo)}/>
         */}
    </Switch>
);

export default getRouter;