
import React, {Component} from 'react'

import {compact}  from 'lodash'

import Hash from './.internal/Hash'

import assocIndexOf from './.internal/assocIndexOf'

import MapCache from  './.internal/MapCache'

import isArrayLikeObject from './isArrayLikeObject'
import baseFlatten from './.internal/baseFlatten'

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
            p9 : Symbol("d"),
            P10 : NaN
        }
        
        const data = [["name","55"],["age","12"],["city","shanghai"]];
        const data1 = [[5],[1, 2, 3, 4],'455',123434,false,function (){console.log('f')},undefined,{name:"xuxiaoping",age:12,city:"上海",home:"香花",length:3},null,Symbol("d"),new Set(),NaN]
        const obj = {name:"xuxiaoping",age:12,city:"上海",home:"香花",length:3};
        //  console.log(assocIndexOf(data,"age"))

      //  console.log("Hash", new Hash)

      // ==============================
      // const map = new MapCache([["name","55"],["age","12"],[12,"12"],[function(){},899]])
      // console.log(map.delete("name"))
      // console.log(map)

      // ==========================
      const r1 = [1, [2, 3, [4]]];
      console.log("baseFlatten(data1)",baseFlatten(r1,2))
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