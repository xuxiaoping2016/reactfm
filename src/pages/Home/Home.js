import React, { Component } from 'react';
import {log} from '../../utils/utils'



//["supplier#.app.goods.list", "supplier#.app.goods.list.fdf"]
//["supplier#app.goods.list", "supplier#app.goods.list.fdf"]

export default class Home extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount(){
        log('大家好，%s 我是','很')
       
    }

   
    render(){
        return (
            <div className="container">
                dsf
            </div>
        )
    }
}