export function toTree(flatTreeData, format = {}) {
  const { id = 'id', parentId = 'parentId', children = 'children' } = format;
  const hashMap = {};
  const list = [];
  const ret = [];
  flatTreeData.forEach(item => {
    const copyedItem = Object.assign({}, item);
    hashMap[item[id]] = copyedItem;
    list.push(copyedItem);
  });
  list.forEach(item => {
    const parent = hashMap[item[parentId]];
    if (parent) {
      if (!parent[children]) {
        parent[children] = [item];
      } else {
        parent[children].push(item);
      }
    } else {
      ret.push(item);
    }
  });
  return ret;
}

export function toFlattenTree(treeData, format = {}) {
  const { children = 'children' } = format;
  const stock = Array.isArray(treeData) ? treeData : [treeData];
  const ret = [];
  let current = null;
  while ((current = stock.pop())) {
    const item = Object.assign({}, current);
    delete item[children];
    ret.unshift(item);
    if (current[children] && current[children].length) {
      stock.push(...current[children]);
    }
  }
  return ret;
}

export function tranverse(treeData, format = {}) {
  const { children = 'children' } = format;
  return function(processer) {
    const stock = [...treeData];
    let current = null;
    while ((current = stock.pop())) {
      processer(current);
      const childs = current[children];
      if (childs && childs.length) {
        stock.push(...childs);
      }
    }
  };
}

export function obTranverse(obTreeData, processer, format = {}) {
  if (!obTreeData) {
    return;
  }
  const { children = 'children' } = format;
  const stock = Object.values(obTreeData);
  let current = null;
  while ((current = stock.pop())) {
    processer(current);
    const childs = current[children];
    if (childs) {
      stock.push(...Object.values(childs));
    }
  }
}

export function getTreeDataPath(
  treeData,
  format = { key: 'key' },
  ret = {},
  paths = []
) {
  treeData.forEach((item, index) => {
    const subPaths = paths.concat(index);
    ret[item[format.key]] = subPaths;
    Array.isArray(item.children) &&
      getTreeDataPath(item.children, format, ret, subPaths);
  });
  return ret;
}

export default {
  toTree,
  toFlattenTree,
  tranverse,
  obTranverse,
  getTreeDataPath,
};
