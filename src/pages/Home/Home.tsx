import React, { Component } from 'react';
import Hello from './compoent1'

export default class Home extends Component{
    componentDidMount(){
        let a:void = undefined;
        let b:void = null;
        let c:number = undefined;
        let d:void = void 0;

        const someValue = 123
        // let e:number =(someValue as string).length;

        let fn:(x:number,y:number) => string = function(x1:number,y1:number):string{
            return (x1+y1).toString();
        }
    }
    render(){
        return <Hello compiler="xuxiaoping" framework="dfd"/>
        return <div>fdf</div>
    }
}