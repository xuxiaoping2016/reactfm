import { initVnode} from './kkbvdom'

function render(vdom,container){
    console.log("kkbreact-dom",vdom,container)
    let rootNode = initVnode(vdom)
    console.log("render rootNode", rootNode)
    container.appendChild(rootNode)
}
export default {render};