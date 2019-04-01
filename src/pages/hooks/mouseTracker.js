import React, { Component } from 'react';

export default class MouseTracker extends Component {
    constructor(props){
        super(props)
        this.state ={
            x:0,
            y:0,
        }
    }

    handleMouseMove = (event) => {
        this.setState({
            x:event.clientX,
            y:event.clientY
        })
    }

    render(){
        const {x,y} = this.state;
        return (
            <div style={{height:"100%"}} onMouseMove={this.handleMouseMove}>
                <h1>Move the mouse around!</h1>
                <p>The current mouse position is ({x}, {y})</p>
            </div>
        )
    }
}