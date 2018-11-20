import React, { Component } from 'react';
import qs from 'qs'
import pathToRegexp from 'path-to-regexp';

export default class PathToReg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            href :"http://www.baidu.com/cate1/cate2?quer=1&quer2=2"
        }
    }

    componentDidMount(){
        const pathPrefix = '/app/:pid/:storeId/:param1/:param2';
        const ret = this.enhancedPath(this.fillPath(pathPrefix));
        const l = ret({param1:1,param2:8},{query1:12,query2:2})
        console.log(l)
    }


    fillPath = path => {
        const pid = 1534;
        const storeId= 12;
        const formatted = path.replace(/:pid/, pid).replace(/:storeId/, storeId);
        // const formatted = pathToRegexp.compile(path)({pid:12,storeId:9090});
        //这种写法 报错  TypeError: Expected "param1" to be a string；
        console.log(formatted)
        return pathToRegexp.compile(formatted);
    };

    enhancedPath = func => (pathParam, queryParam = {}) =>
  `${func(pathParam)}${qs.stringify(queryParam, { addQueryPrefix: true })}`;

    render(){
        return (
            <div className="container">
               qs demo
            </div>
        )
    }
}