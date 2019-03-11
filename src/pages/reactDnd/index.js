import React, { Component } from 'react'
import Dustbin from './Dustbin/js/index'
// import DustbinTs from './Dustbin/ts/index.tsx'

export default class DragDemo extends Component{
    render(){
        return (
            <React.Fragment>
                <Dustbin/>
                {/* <DustbinTs /> */}
            </React.Fragment>
        )
    }
}