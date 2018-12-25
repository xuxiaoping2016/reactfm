# createCascader

创建能够自动获取列表数据的 Cascader 组件，接收一个返回 promise 的函数，这个 promise 需要 resolve 格式化的数组。请求的方法，数据，pending 状态，异常错误对象统一由 mobx 的 model 维护。

### 引用方式

```javascript
//在index.js里面注册接口，然后将返回值导出
import createCascader from './createCascader';
import request from 'utils/request';
import { formatTree } from 'utils/treeTransform';
const selectCategoryTreeFormat = {
  key: { from: 'categoryCode', to: 'value' },
  title: { from: 'categoryName', to: 'label' },
  children: { from: 'subCategoryList', to: 'children' },
};
//返回一个Cascader组件
export const GoodsCategoryCascader = createCascader(query =>
  request
    .post('/api/supplier/goods/selectCategoryTree')
    .then(({ data: { subCategoryList } }) => {
      const list = formatTree(subCategoryList, selectCategoryTreeFormat);
      return [{ label: '商品类目', value: '', isLeaf: true }, ...list];
    })
);
```

### 创建的 Cascader 组件参数说明

| 属性     | 说明                                                                       | 类型     | 默认值           |
| -------- | -------------------------------------------------------------------------- | -------- | ---------------- |
| lazy     | 是否在第一次 focus 的时候请求，fasle 则表示在 componentDidMount 的时候请求 | boolean  | fasle            |
| useCache | 是否使用 mobx 的 model 实例维护的缓存数据，全局只有一份数据                | boolean  | true             |
| query    | 请求数据的查询参数，为 createCascader 的第一个参数函数的参数               | object   | {}               |
| onFocus  | Cascader 选框 focus 时的回调函数                                           | function | lodash.indentity |
| onLoad   | 请求成功时的回调函数                                                       | function | lodash.indentity |
| onError  | 请求失败时的回调函数                                                       | function | lodash.indentity |
| others   | 同 antd 的 Cascader 组件                                                   |          |

### API

无

### 代码示例

```javascript
  import { GoodsCategoryCascader } from 'components/uiKits/selects';

    <GoodsCategoryCascader
          {...getFieldProps('categoryCode')}
          lazy
          useCache
          query={id:'1'}
          onFocus={()=>{}}
          onLoad={()=>{}}
          onError={()=>{}}
          placeholder="商品类目"
          {...ontherAntdCascaderProps}
        />
```
