/*eslint-disable*/
const judgeHalfChecked = item => item.halfChecked;

export function flushUnCheck(predecessors, stock) {
  const last = stock[stock.length - 1];
  delete last.halfChecked;
  delete last.children;
  let i = predecessors.length,
    index,
    len,
    halfChecked,
    predecessor,
    current,
    parent;
  while ((current = stock.pop())) {
    i--;
    parent = stock[stock.length - 1];
    if (parent && current) {
      index = parent.children.findIndex(item => item.key === current.key);
      if (!current.children || current.children.length === 0) {
        parent.children.splice(index, 1);
        len = parent.children.length;
        predecessor = predecessors[i];
        if (
          predecessor &&
          predecessor.children &&
          len < predecessor.children.length
        ) {
          parent.halfChecked = true;
        } else {
          delete parent.halfChecked;
        }
      } else {
        halfChecked = parent.children.some(judgeHalfChecked);
        if (halfChecked) {
          parent.halfChecked = true;
        } else {
          delete parent.halfChecked;
        }
      }
    }
  }
}

export function flushCheck(predecessors, stock) {
  const last = stock[stock.length - 1];
  const lastChildren = predecessors[predecessors.length - 1].children;
  delete last.halfChecked;
  delete last.children;
  if (lastChildren) {
    last.children = lastChildren;
  }
  let i = predecessors.length,
    current,
    predecessor,
    predecessorChilds,
    selfChilds;
  while ((current = stock.pop())) {
    i--;
    predecessor = predecessors[i];
    selfChilds = current.children;
    predecessorChilds = predecessor.children;
    if (
      selfChilds &&
      predecessorChilds &&
      (selfChilds.length < predecessorChilds.length ||
        selfChilds.some(judgeHalfChecked))
    ) {
      current.halfChecked = true;
    } else {
      delete current.halfChecked;
    }
  }
}

export const generateSet = len => {
  const ret = [];
  while (len--) {
    ret.push(false);
  }
  return ret;
};
