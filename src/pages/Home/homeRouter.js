import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';

import Readfilers from 'pages/Home/demos/fileReader.jsx';
import ReadXlsx from 'pages/Home/demos/readXlsx.jsx'
@withRouter
export default class XlsxRouter extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    console.log(this.props)
  }
  render(){
    const { path } = this.props.match;
    return (
      <Switch>
        <Route exact path={`${path}/readfile`} component = {Readfilers}/>
        <Route exact path={`${path}/readxlsx`} component = {ReadXlsx}/>
      </Switch>
    )
  }
}
