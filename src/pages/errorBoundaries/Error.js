import React, { Component} from 'react';

export default class Errors extends Component {
    componentDidMount(){
        const err = new Error("错误实例")
        console.log(err.name,err.message,err.fileName,err.lineNumber,err.columnNumber,err.stack)
    }
    render(){
        return (
            <div>
                <p>Error构造函数</p>
            </div>
        )
    }
}