import React, { Component } from 'react';
import pathToRegexp from 'path-to-regexp'

export default class PathTo extends Component {
    componentDidMount(){
        const toPath = pathToRegexp.compile('/user/:id/:urserid')
        console.log (toPath({
            id:12345}))
    }
    render(){
        return (
            <div>
                <div></div>
            </div>
        )
    }
}