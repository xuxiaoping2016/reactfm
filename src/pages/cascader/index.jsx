import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import CascaderDemo1 from './demo1'
import CitySwitcher from './demo2'
import CascaderWithCode from './cascaderWithCode'
import LazyOptions from './lazyOptions'
import ShowSearch from './showSearch'

import { request } from '../../utils/request'
import createCascader from './createCascader'


export function tranverse(treeData, format = {}) {
    const { children = 'children' } = format;
    return function(processer) {
      const stock = [...treeData];
      let current = null;
      while ((current = stock.pop())) {
        processer(current);
        const childs = current[children];
        if (childs && childs.length) {
          stock.push(...childs);
        }
      }
    };
  }


export const AreasCascader = createCascader(() =>
  request({url:'http://localhost/api/supplier/area/queryAllAreaInfo'}).then(res => {
      console.log(res,"res.........")
    let data = res.data || {};
    data = data.firstAreaInfoVo || [];
    const format = { children: 'children' };
    tranverse(data, format)(item => {
      item.label = item.areaName;
      item.value = item.areaCode;
    });
    return data;
  })
);

export default class CascaderDemo extends Component {
    constructor(props){
        super(props);
    }

    componentWillMount(){
    }

    render() {
        const { url : localUrl } = this.props.match;
        return (
            <div>
                {/* <ul>
                    <li><Link exact to={`${localUrl}/cascaderDemo1`}>CascaderDemo1</Link></li>
                    <li><Link exact to={`${localUrl}/citySwitcher`}>CitySwitcher</Link></li>
                    <li><Link exact to={`${localUrl}/cascaderWithCode`}>CascaderWithCode</Link></li>
                    <li><Link exact to={`${localUrl}/lazyOptions`}>lazyOptions</Link></li>
                </ul>
                <Router>
                    <Switch>
                        <Route exact path={`${localUrl}/cascaderDemo1`} component= {CascaderDemo1}/>
                        <Route exact path={`${localUrl}/citySwitcher`} component= {CitySwitcher}/>
                        <Route exact path={`${localUrl}/ascaderWithCode`} component= {CascaderWithCode}/>
                        <Route exact path={`${localUrl}/lazyOptions`} component= {LazyOptions}/>
                    </Switch>
                </Router>
                {this.props.children} */}


               {/* <CascaderDemo1/>
               <CitySwitcher/>
               <CascaderWithCode/>
               <LazyOptions/> */}

               <AreasCascader
                style={{ width: '330px' }}
                // useCache
                placeholder="请选择开户省市"
                query={{name:"xuxi"}}
                displayRender={this.displayRender}
              />
            </div>
        )
    }
}