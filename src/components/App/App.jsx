import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

import Nav from 'components/Nav/Nav.jsx';
import getRouter from 'router/router';


export default class App extends Component {
    componentDidMount(){
        // console.log(this)
        // console.log("App",this.props)
    }
    render(){
        const { history } = this.props;
        return (
            <Router history={history}>
                <div>
                    <Nav/>
                    {getRouter()}
                </div>
            </Router>
        )
    }
}