// 创建虚拟元素 vtype 虚拟元素类型，type 元素标签，props 包含children在内的属性；
function createVnode(vtype, type, props) {
  return { vtype, type, props };
}
// 根据虚拟元素创建真实元素
function initVnode(vnode) {
  console.log("initVnode", vnode);
  const { vtype, type, props } = vnode;
  if (!vtype) {
    // 普通字符串
    return document.createTextNode(vnode);
  }

	if (vtype == 1) {
		// 原生元素
		return iniVelement(vnode);
  } else if (vtype == 2) {
    // 函数式组件、
    return initFunComp(vnode);
  } else {
    // class组件
    return initClassComp(vnode);
  }
}
// 处理函数组件元素
function initFunComp(vnode) {
  const { type, props } = vnode;
  let newNode = type(props); //转换成原生元素
  // console.log(newNode,"newNode")
  return initVnode(newNode);
}
// 处理class 组件元素
function initClassComp(vnode) {
  const { type, props } = vnode;
  let component = new type(props);
  let newNode = component.render();
  return initVnode(newNode);
}
// 处理原生元素
function iniVelement(vnode) {
  const { vtype, type, props } = vnode;
  const node = document.createElement(type);
  const { key, style, children, ...rest } = props;
  Object.keys(rest).forEach((k) => {
    node.setAttribute(k, rest[k]);
  });

	// Object.keys(style).forEach(k => {

  // })
	initVchildren(node, children);

	return node;
}

function initVchildren(node, children) {
  children.forEach((k) => {
    node.appendChild(initVnode(k));
  });
}

export { createVnode, initVnode };
