import React, { Component } from 'react';
// import {Router, browserHistory} from 'react-router';

import Nav from 'components/Nav/Nav.jsx';
import getRouter from 'router/router';


export default class App extends Component {
    componentDidMount(){
        console.log(this.props.children)
    }
    render(){
        return (
            <div>
                <Nav/>
                {this.props.children}
            </div>
        )
    }
}