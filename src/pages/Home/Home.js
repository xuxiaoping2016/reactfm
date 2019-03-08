import React, { Component } from 'react';
import ht,{ firstName, lastName, year, multiply } from './profile.js'
import { counter, incCounter, foo} from './lib'
// const mod = require('./lib')

import im from '../../images/wait.png'
export default class Home extends Component {
    componentDidMount(){
        console.log(counter)
        incCounter()
        console.log(counter)
    }

    render(){
        return (
            <div className="container">
                {`我的名字是${ht.firstName}${ht.lastName}，生于${ht.year}年，${ht.multiply2(3,5)}`}<br/>
                {/* {`我的名字是${ht.ht.firstName}${ht.ht.lastName}，生于${ht.ht.year}年，${ht.ht.multiply(3,5)}`}<br/> */}
                {`我的名字是${firstName}${lastName}，生于${year}年，${multiply(3,5)}`}<br/>
                {`foo${foo}`}
            </div>
        )
    }
}