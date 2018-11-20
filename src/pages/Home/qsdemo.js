import React, { Component } from 'react';
import qs from 'qs'

export default class QsDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            href :"http://www.baidu.com/cate1/cate2?quer=1&quer2=2"
        }
    }

    componentDidMount(){
        //解析查询字符串为对象 {quer: "1", quer2: "2"}；
        // const ret = qs.parse('quer=1&quer2=2')
        // console.log(ret)

        // qs.stringify()将对象 序列化成URL的形式，以&进行拼接

        let obj= {
            method: "query_sql_dataset_data",
            projectId: "85",
            appToken: "7d22e38e-5717-11e7-907b-a6006ad3dba0",
            datasetId: " 12564701"
          };
    //    console.log(qs.stringify(obj));
       //method=query_sql_dataset_data&projectId=85&appToken=7d22e38e-5717-11e7-907b-a6006ad3dba0&datasetId=%2012564701

       console.log(qs.stringify({ a: ['b', 'c', 'd'] }))  //a%5B0%5D=b&a%5B1%5D=c&a%5B2%5D=d

       console.log(qs.parse('a=b&a=c&a=d'))
    }

    render(){
        return (
            <div className="container">
               qs demo
            </div>
        )
    }
}