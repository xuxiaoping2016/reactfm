import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';

import Readfilers from 'pages/Home/demos/fileReader.jsx';


export default class XlsxRouter extends Component {
  render(){
    return (
        <Switch>
            <Route exact path="/home/readfile" component = {Readfilers}/>
        </Switch>
    )
  }
}
