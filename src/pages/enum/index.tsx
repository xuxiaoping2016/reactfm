import React, { Component } from 'react';

import Gaoji from './gaoji'


export default class Enum extends Component {
    componentDidMount(){
        //https://www.imooc.com/article/41842
        enum Direction {
            Up = 1,
            Down,
            Left,
            Right
        }

        let bi:Direction = Direction.Up;
        console.log(bi,Direction[2])

        // enum E {
        //     X,Y,Z
        // }
        // function f(obj: { X: number }) {
        //     return obj.X
        // }
         
        // console.log(f(E));

        

    }
    render(){
        return (
            <div>
                <div>枚举示例!!!</div>
                <Gaoji/>
            </div>
        )
    }
}