import { createVnode } from './kkbvdom'


function createElement(type, props, ...children){
    
    // delete props.__source;
    props = props || {}

    let vtype;
    if(typeof type == "string"){
        //字符串 普通元素
        vtype = 1
        console.log("vtype",vtype,props,children)
    }else if(typeof type == "function"){
        // 3 class组件  2函数组件
       vtype = type.isReactComponent ? 3 : 2;
       console.log("vtype",vtype,props,children)
    }

    props.children = children;
    // console.log(type, vtype, props,children)
    return createVnode(vtype,type,props);
}


class Component{
    static isReactComponent = true;
    
    constructor(props){
        this.props = props;
        this.state = {};
    }
    
    setState(){

    }
    
}

// class Updatar {
//     constructor(){

//     }
// }


export default {createElement,Component};

/**
 * 
 * createElement先判断children的vtype 并返回虚拟节点
 * 再判断根元素的类型并调用render来生成函数 
 */