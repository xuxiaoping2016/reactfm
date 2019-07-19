import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

import Nav from 'components/Nav/Nav.jsx';
import getRouter from 'router/router';


export default class App extends Component {
    render(){
        return (
            <Router>
                <div className="container">
                    <Nav className="nav-menu-wrap"/>
                    {getRouter()}
                </div>
            </Router>
        )
    }
}