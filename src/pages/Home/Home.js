import React, { Component } from 'react';
  class IncreasingCounter {
    _count = 0
    get value() {
        console.log('Getting the current value!');
        return this._count;
    }
    increment() {
        this._count++;
    }
  }



export default class Home extends Component {
    componentDidMount(){
        var i = new IncreasingCounter()
        console.log(i.value)
        i.increment()
        console.log(i.value)
    }

    render(){
        return (
            <div>
                <h1>Welcome!</h1>
            </div>
        )
    }
}