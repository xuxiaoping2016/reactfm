import React, { Component } from "react";
import PT from 'prop-types';

class P2 extends Component{
    // state = {
    //     prop1 : "prop1",
    //     prop2 : 12
    // }
    // static childContextTypes = {
    //     prop1: PT.string,
    //     prop2: PT.number
    // };

    // getChildContext(){
    //     return {
    //         prop1: this.state.name,
    //         prop2: this.state.age
    //     }
    // };
    render(){
        console.log(this)
        return <P3/>
    }
};

class P3 extends Component{
    static contextTypes = {
        name: PT.string,
        age: PT.number,
        store: PT.object
    }
   render(){
    console.log(this)
       return (
           <div>
               跨级获取context
               <p>姓名:{this.context.name},年龄:{this.context.age}</p>
           </div>
       )
   }
};

export default class P1 extends Component{
    static childContextTypes = {
        name: PT.string,
        age: PT.number
    };

    getChildContext(){
        return {
            name: this.props.name,
            age: this.props.age
        }
    };

    render(){
        console.log(this)
        return (
            <div>
                父级
                <div>
                    <p>姓名:{this.props.name},年龄:{this.props.age}</p>
                    <P2 />
                </div>
                {
                    this.props.children
                }
            </div>
        )
    }
}