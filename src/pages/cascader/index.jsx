import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import CascaderDemo1 from './demo1'
import CitySwitcher from './demo2'
import CascaderWithCode from './cascaderWithCode'
import LazyOptions from './lazyOptions'
import ShowSearch from './showSearch'

export default class CascaderDemo extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <ul>
                    <li><Link to="cascaderDemo1">CascaderDemo1</Link></li>
                </ul>
                {this.props.children}
               {/* <CascaderDemo1/>
               <CitySwitcher/>
               <CascaderWithCode/>
               <LazyOptions/> */}
            </div>
        )
    }
}