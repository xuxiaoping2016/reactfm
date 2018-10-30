
import React, {Component} from 'react'

import { slice } from './array'

import {compact}  from 'lodash'

import Hash from './.internal/Hash'

import assocIndexOf from './.internal/assocIndexOf'


class Test1 extends Component {

    componentDidMount(){
        const params = {
            p1 : [1, 2, 3, 4],
            p2 : '455',
            p3 : 123434,
            p4 : false,
            p5 :function (){},
            p6 : undefined,
            p7 : {name:"xuxiaoping",age:12,city:"上海",home:"香花"},
            p8 : null,
            p9 : Symbol("d")
        }
        
        const data = [["name","55"],["age","12"],["city","12"]];
        const data1 = ["1","gf","gfgghhh"]
       console.log(assocIndexOf(data,"age"))
    }
 
  render() {
    return (
      <div>
       <p>lodash 源码学习</p>


      </div>
    )
  }
}

export default Test1