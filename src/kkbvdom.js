function createVnode(vtype,type,props){
    return { vtype,type,props }
}

function initVnode(vnode){
    console.log("initVnode",vnode)
    const { vtype,type,props } = vnode;
    if(!vtype){
        // 普通字符串
        return document.createTextNode(vnode)
    }

    if(vtype == 1){
        // 原生元素
        return iniVelement(vnode)
        
    } else if (vtype == 2){
        // 函数式组件、
        return initFunComp(vnode)
    } else{
        // class组件
        return initClassComp(vnode)
    }
}

function initFunComp(vnode){
    const { type, props } = vnode;
    let newNode = type(props); //转换成原生元素
    // console.log(newNode,"newNode")
    return initVnode(newNode)
}
function initClassComp(vnode){
    const { type, props} = vnode;
    let component = new type(props);
    let newNode = component.render();
    return initVnode(newNode)
}
function iniVelement(vnode){
    const { vtype,type,props } = vnode;
    const node = document.createElement(type)
    const { key, style, children, ...rest} = props;
    Object.keys(rest).forEach(k => {
        node.setAttribute(k, rest[k])
    })

    // Object.keys(style).forEach(k => {

    // })
    initVchildren(node,children)

    return node;
}

function initVchildren(node,children){
    children.forEach(k => {
        node.appendChild(initVnode(k))
    })
}

export { createVnode, initVnode}

