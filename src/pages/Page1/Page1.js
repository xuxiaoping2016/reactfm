import React, { Component } from 'react';
import moment from 'moment'

export default class Page1 extends Component {
    render(){
        console.log(moment().format("YYYY-MM-DD"))
        console.log(moment().subtract(30, 'days').format("YYYY-MM-DD"))
        return (
            <div className="page1">
                <div>moment().format()  输出值:<br/>{moment().format()}</div>
                <div>moment("12-25-1995", "MM-DD-YYYY") ：{moment("12-25-1995", "MM-DD-YYYY").format()}</div>
                <div>moment("1995-12-28", "MM-DD-YYYY") ：{moment("1995-12-28", "YYYY-MM-DD").format()}</div>
                
            </div>
        )
    }
}