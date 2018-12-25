# createSelect

创建能够自动获取列表数据的 Cascader 组件，接收一个返回 promise 的函数，这个 promise 需要 resolve 格式化的数组。请求的方法，数据，pending 状态，异常错误对象统一由 mobx 的 model 维护。

### 引用方式

```javascript
//在index.js里面注册接口，然后将返回值导出
import createSelect from './createSelect';
import request from 'utils/request';
import { formatTree } from 'utils/treeTransform';
//返回一个Select组件
export const ExpressCompanySelect = createSelect(() =>
  request
    .post('/api/supplier/order/query_express_companys')
    .then(({ data }) => data)
);
```

### 创建的 Select 组件参数说明

| 属性     | 说明                                                                                              | 类型     | 默认值           |
| -------- | ------------------------------------------------------------------------------------------------- | -------- | ---------------- |
| lazy     | 是否在第一次 focus 的时候请求，fasle 则表示在 componentDidMount 的时候请求                        | boolean  | fasle            |
| useCache | 是否使用 mobx 的 model 实例维护的缓存数据，全局只有一份数据                                       | boolean  | true             |
| query    | 请求数据的查询参数，为 createSelect 的第一个参数函数的参数                                        | object   | {}               |
| onFocus  | Cascader 选框 focus 时的回调函数                                                                  | function | lodash.indentity |
| onLoad   | 请求成功时的回调函数                                                                              | function | lodash.indentity |
| onError  | 请求失败时的回调函数                                                                              | function | lodash.indentity |
| children | 组件的 children，是一个接受数组数据的函数，返回根据这个数组 map 得到的 Select.Option 实例化的数组 | function |                  |
| others   | 同 antd 的 Select 组件                                                                            |          |

### API

无

### 代码示例

```javascript
import { ExpressCompanySelect } from 'components/uiKits/selects';

<FormItem
  {...formItemLayout}
  required
  label="快递公司"
  className="deliveryCompanyCode"
>
  {getFieldDecorator('deliveryCompanyCode', {
    rules: [{ required: true, message: '请选择' }],
  })(
    <ExpressCompanySelect useCache>
      {options =>
        options.map(item => (
          <Option key={item.deliveryCompanyCode}>
            {item.deliveryCompanyName}
          </Option>
        ))
      }
    </ExpressCompanySelect>
  )}
</FormItem>;
```
