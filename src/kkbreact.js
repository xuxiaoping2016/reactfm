function createElement(type, props, ...children){
    
    // delete props.__source;

    // let vtype;
    // if(typeof type == "string"){
    //     //字符串 普通元素
    //     vtype = 1
    // }else if(typeof type == "function"){
    //     // 3 class组件  2函数组件
    //    vtype = type.isReactComponent ? 3 : 2;
    // }else

    props.children = children;
    // console.log(type, props, children)
    return { type, props }
}


// class Component{
//     static isReactComponent = true;
    
//     constructor(props){
//         this.props = props;
//         this.state = {};
//     }
    
//     setState(){

//     }
    
// }

// class Updatar {
//     constructor(){

//     }
// }


export default {createElement};