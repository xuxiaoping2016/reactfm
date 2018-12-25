/*eslint-disable*/
const isHalfChecked = item => item.halfChecked;

export function flushUnCheck(predecessors, stack) {
  //last为取消选择的节点，需要删除“halfChecked”，“children”属性
  const last = stack[stack.length - 1];
  delete last.halfChecked;
  delete last.children;
  let i = predecessors.length,
    index,
    len,
    halfChecked,
    predecessor,
    current,
    parent;
  while ((current = stack.pop())) {
    i--;
    //parent位于current前一位
    parent = stack[stack.length - 1];
    if (parent && current) {
      //current在兄弟节点中的索引
      index = parent.children.findIndex(item => item.key === current.key);
      //自己没有children
      if (!current.children || current.children.length === 0) {
        //就把自己从兄弟数组中删除
        parent.children.splice(index, 1);
        len = parent.children.length;
        //链路上迭代的节点
        predecessor = predecessors[i];
        //有children但是数量不是全部，视为半选
        if (
          predecessor &&
          predecessor.children &&
          len < predecessor.children.length
        ) {
          parent.halfChecked = true;
          //否则视为全选
        } else {
          delete parent.halfChecked;
        }
        //自己有children
      } else {
        //只要有一个兄弟节点为半选状态，那么其父节点也为半选
        halfChecked = parent.children.some(isHalfChecked);
        if (halfChecked) {
          parent.halfChecked = true;
        } else {
          delete parent.halfChecked;
        }
      }
    }
  }
}

export function flushCheck(predecessors, stack) {
  //last为选择的节点，需要删除“halfChecked“属性
  //如果自己被选中，那么自己在总的选项中的所有后代都被选中
  const last = stack[stack.length - 1];
  const lastChildren = predecessors[predecessors.length - 1].children;
  delete last.halfChecked;
  delete last.children;
  if (lastChildren) {
    //TODO 需要删除除key，title，children之外的所有的属性
    last.children = deepClone(lastChildren);
  }
  let i = predecessors.length,
    current,
    predecessor,
    predecessorChilds,
    selfChilds;
  while ((current = stack.pop())) {
    i--;
    predecessor = predecessors[i];
    selfChilds = current.children;
    predecessorChilds = predecessor.children;
    if (
      selfChilds &&
      predecessorChilds &&
      (selfChilds.length < predecessorChilds.length ||
        selfChilds.some(isHalfChecked))
    ) {
      current.halfChecked = true;
    } else {
      delete current.halfChecked;
    }
  }
}

export function getCheckedKeysMap(list) {
  let checkKeysMap = {},
    stack = list.slice(0),
    current = null;
  //广度优先遍历树形结构
  while ((current = stack.pop())) {
    if (current.halfChecked) {
      checkKeysMap[current.key] = 1; //half checked
    } else {
      checkKeysMap[current.key] = 2; //all checked
    }
    if (current.children) {
      stack.push(...current.children);
    }
  }
  return checkKeysMap;
}

export function getPanelsByKeys(list, keys = []) {
  const ret = [{ options: list }];
  const len = keys.length;
  for (let i = 0; i < len; i++) {
    let options,
      index,
      k = keys[i];
    const last = ret[ret.length - 1];
    options = last && last.options[k] && last.options[k].children;
    index = k;
    if (typeof index === 'number' && options) {
      ret.push({ index, options });
    } else {
      break;
    }
  }
  return ret;
}

export function deepClone(obj) {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }
  let ret = {};
  if (Array.isArray(obj)) {
    ret = obj.map(deepClone);
  } else {
    Object.keys(obj).forEach(key => {
      return (ret[key] = deepClone(obj[key]));
    });
  }
  return ret;
}
