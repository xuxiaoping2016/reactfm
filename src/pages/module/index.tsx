/// <reference path="biology.ts" />
import React, { Component } from 'react';

// let dog: Biology.Animal;
// dog = new Biology.Dog('狗狗');
// dog.eat();

function identity<T>(arg: T): T {
    return arg;
}

export default class ModuleDemo extends Component {
    componentDidMount(){
        console.log(identity("hello"))

    }
    render(){
        return (
            <div>
                dfd
            </div>
        )
    }
}