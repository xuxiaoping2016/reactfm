//diff 算法
let Index = 0;
function diff(oldTree, newTree) {
    let patches = {};
    let index = 0;
    //递归数比较后的结果放到补丁包中
    walk(oldTree, newTree, index, patches);
    return patches;
}
function walk(oldTree, newTree, index, patches){
    let currentPatch = [];//每个元素都有一个补丁对象
    if (!newTree) {
        currentPatch.push({type:'REMOVE', index})
    } 
    if (isString(oldTree) && isString(newTree)) {
        // 判断文本是否一致
        if (oldTree !== newTree) {
            currentPatch.push({type:'TEXT',text:newTree}); 
        }
    }else if(oldTree.type === newTree.type) {
        //比较属性是否有更改
        let attrs = diffAttr(oldTree.props, newTree.props);
        if(Object.keys(attrs).length) {
            currentPatch.push({type:'ATTRS', attrs});
        }
        // 如果有儿子节点，遍历子节点
          diffChildren(oldTree.children, newTree.children, index, patches);
    } else {
        // 节点类型不同的时候，直接替换
        currentPatch.push({type:'REPLACE', newTree});
    }
    // 当前元素有补丁的情况下，将元素和补丁对应起来，放到大补丁包中
    if(currentPatch.length) {
        patches[index] = currentPatch; 
    }
}
function diffAttr(oldAttrs, newAttrs) {
    let patch = {};
    for(let key in oldAttrs) {
        if(oldAttrs[key] !== newAttrs[key]) {
            patch[key] = newAttrs[key];//有可能是undefined，新节点没有旧节点的属性      
        }
    }
    for(let key in newAttrs) {
        //老节点没有新节点的属性
        if(! oldAttrs.hasOwnProperty(key)) {
            patch[key] = newAttrs[key]
        }
    }
    return patch;
}

function diffChildren(oldChildren, newChildren, index, patches){
    // 比较老的第一个和新的第一个
    oldChildren.forEach((child, idx) => {
        // 记得索引得改
        // Index 每次传递给walk时，index是递增的，所有节点都基于一个序号实现，因此需要维护一个全局Index
        walk(child, newChildren[idx], ++Index, patches);
    }) 
}


function isString(node) {
    return Object.prototype.toString.call(node) === '[object string]';
}


function patch(node, patches) {
 // 给某个元素打补丁
 
}

export default diff;