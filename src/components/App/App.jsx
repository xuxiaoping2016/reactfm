import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import ErrorBoundary from 'components/ErrorBoundary/index.jsx'
import Nav from 'components/Nav/Nav.jsx';
import getRouter from 'router/router';


export default class App extends Component {
    render(){
        return (
            <Router>
                <ErrorBoundary render={() =><h1>Something went wrong.</h1>}>
                    <Nav/>
                    {getRouter()}
                </ErrorBoundary>
            </Router>
        )
    }
}