# createAutoEnums

创建 AtuoEnums 高阶组件，这个高阶组件可以预先请求需要的枚举数组列表数组，还可以做缓存控制，根据之前已经缓存的数据减少 api 调用次数。createAutoEnums 接收的唯一参数就是通过 createSelect 和 createCascader 产生的 mobx Selector 实例。

### 引用方式

```javascript
import createAutoEnums from './createAutoEnums';

export const enums = {
  goodsCategoryCascader: GoodsCategoryCascader.store,
  expressCompanySelect: ExpressCompanySelect.store,
  allFreightTemplatesSelect: AllFreightTemplatesSelect.store,
  areasCascader: AreasCascader.store,
  industriesSelect: IndustriesSelect.store,
};

export const AutoEnums = createAutoEnums(enums);
```

### 高阶组件 AutoEnums 配置参数

| 属性       | 说明                                               | 类型     | 默认值   |
| ---------- | -------------------------------------------------- | -------- | -------- |
| nameSpace  | 传递给子组件的属性名称                             | string   | 'enums'  |
| mapEnums   | 绑定枚举值列表到 nameSpace 的对象上                | function | () => {} |
| enums      | 需要请求的枚举值数据别名（必须在 enums 上注册）    | array    | []       |
| forceEnums | 同 enums，不同的是这里不会使用缓存，每次都请求数据 | array    | []       |

### API

无

### 代码示例

```javascript
import React from 'react';
import { AutoEnums } from 'components/uiKits/selects';

@AutoEnums({
  enums: ['areasCascader', 'industriesSelect'],
  mapEnums({ industriesSelect }) {
    return {
      industriesSelect: industriesSelect.data,
    };
  },
})
@Form.create()
class StoreInfo extends React.Component {
  render() {
    const {
      enums: { loading, industriesSelect },
    } = this.props;

    return null;
  }
}
```
