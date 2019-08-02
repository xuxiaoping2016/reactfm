import { initVnode} from './kkbvdom'

//render 将虚拟节点转化为dom节点
// 将dom节点添加到指定容器
function render(vdom,container){
    console.log("kkbreact-dom",vdom,container)
    let rootNode = initVnode(vdom)
    console.log("render rootNode", rootNode)
    container.appendChild(rootNode)
}
export default {render};