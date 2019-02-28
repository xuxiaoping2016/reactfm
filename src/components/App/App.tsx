import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

import Nav from '../Nav/Nav';
import getRouter from '../../router/router';


export default class App extends Component {
    render(){
        return (
            <Router>
                <div>
                    <Nav/>
                    {getRouter()}
                </div>
            </Router>
        )
    }
}