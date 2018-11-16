import React, { Component } from 'react';
import history from 'utils/history'
import { withRouter } from 'react-router-dom'

@withRouter
export default class His extends Component {

    componentDidMount(){
        console.log("his",history,this.props)
    }

    render(){
        return (
            <div className="container">
                ceshi history
            </div>
        )
    }
}