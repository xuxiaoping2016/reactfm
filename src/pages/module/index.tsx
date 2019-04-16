
import React, { Component } from 'react';
function identity<T>(arg: T): T {
    return arg;
}
export default class ModuleDemo extends Component {
    componentDidMount(){
        console.log(identity<String>("hello"))

    }
    render(){
        return (
            <div>
                dfd
            </div>
        )
    }
}