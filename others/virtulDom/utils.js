
class Element{
    constructor(type, props, children){
        this.type = type;
        this.props = props;
        this.children = children
    }
}


function createElement(type, props, children) {
    return new Element(type, props, children)
}
//将真实DOM渲染到页面
function renderDom(el, target) {
    target.appendChild(el);
}

export default {createElement,renderDom}