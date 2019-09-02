import React, { Component } from 'react';
export interface HelloProps {
    compiler:string;
    framework:string;
}

class Hello extends Component<HelloProps, {}> {
    componentDidMount(){

    }
    render() {
        return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
    }
}
export default Hello;