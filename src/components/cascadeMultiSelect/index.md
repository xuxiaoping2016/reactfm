# CascadeMultiSelect

级联多选组件，适用于级联数据层级之间的联动多选，同时被选中的数据也是级联数据。选中逻辑区别于一般的第三方组件，是自顶向下的选中逻辑，这样就可以异步加载获取数据，也可以一次性获取全部数据。

### 引用方式

```javascript
import CascadeMultiSelect from 'components/cascadeMultiSelect';
```

### 配置参数

| 属性                  | 说明                                             | 类型     | 必填    | 默认值       |
| --------------------- | ------------------------------------------------ | -------- | ------- | ------------ |
| value                 | 可由外部控制的值                                 | array    | false   | []           |
| defaultValue          | 初始默认的值                                     | array    | false   | []           |
| options               | 级联数据                                         | array    | true    |              |
| defaultExpandedPanels | 默认横向展开的级联数据索引值数组                 | array    | false   | []           |
| onChange              | 选项变化的回调函数                               | function | false   | (value)=> {} |
| loadData              | 根据点击节点加载其子节点数据的函数，返回 promise | function | boolean | fasle        | fasle |

### API

无

### 代码示例

```javascript
import React from 'react';
import CascadeMultiSelect from 'components/cascadeMultiSelect';
import request from 'utils/request';

const fetchDistrictById = id => {
  return request.get('/api/district/:id', {
    params: { id },
  });
};

const initialValue = [
  {
    key: '110000',
    title: '北京',
    halfChecked: true,
    children: [
      {
        key: '110100',
        title: '北京市',
        halfChecked: true,
        children: [
          {
            key: '110101',
            title: '东城区',
          },
          {
            key: '110102',
            title: '西城区',
          },
        ],
      },
    ],
  },
  {
    key: '120000',
    title: '天津',
    halfChecked: true,
    children: [
      {
        key: '120100',
        title: '天津市',
        halfChecked: true,
        children: [
          {
            key: '120101',
            title: '和平区',
          },
        ],
      },
    ],
  },
];

class CascadeDemo extends React.Component {
  state = { districtData: [], districtValue: initialValue };
  componentDidMount() {
    fetchDistrictById('all').then(res => {
      this.setState({ districtData: res.data });
    });
  }
  loadSubOptions = item => {
    return fetchDistrictById(item.key).then(res => res.data);
  };
  onChange = districtValue => {
    this.setState({ districtValue });
  };
  render() {
    const { districtData, districtValue } = this.state;

    return (
      <div style={{ marginTop: 40, marginLeft: 60 }}>
        <CascadeMultiSelect
          loadData={this.loadSubOptions}
          onChange={this.onChange}
          value={districtValue}
          defaultValue={initialValue}
          options={districtData}
        />
      </div>
    );
  }
}

// const selectedValueType = PropTypes.arrayOf(
//   PropTypes.shape({
//     key: PropTypes.string,
//     title: PropTypes.string,
//     halfChecked: PropTypes.bool,
//     children: PropTypes.arrayOf(PropTypes.shape({})),
//   })
// );

// CascadeMultiSelect.propTypes = {
//   defaultValue: selectedValueType,
//   value: selectedValueType,
//   options: PropTypes.arrayOf(
//     PropTypes.shape({
//       key: PropTypes.string,
//       title: PropTypes.string,
//       children: PropTypes.arrayOf(PropTypes.shape({})),
//       disabled: PropTypes.bool,
//       isLeaf: PropTypes.bool,
//     })
//   ).isRequired,
//   defaultExpandedPanels: PropTypes.arrayOf(PropTypes.number),
//   onChange: PropTypes.func,
//   loadData: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
// };
```
