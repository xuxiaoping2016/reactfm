import React, {Component} from 'react';
import { Cascader } from 'antd';

const options = [{
    value: 'zhejiang',
    label: '浙江省',
    children: [{
      value: 'hangzhou',
      label: '杭州市',
      children: [{
        value: 'xihu',
        label: '西湖',
      },{
        value: 'xiasha',
        label: 'Xia Sha',
        disabled: true,
      }],
    }],
  }, {
    value: 'jiangsu',
    label: '江苏',
    children: [{
      value: 'nanjing',
      label: '南京',
      children: [{
        value: 'zhonghuamen',
        label: '中华门',
      }],
    }],
  }];
export default class ShowSearch extends React.Component {
    state = {
      options,
    };
  
    onChange = (value, selectedOptions) => {
      console.log(value, selectedOptions);
    }
  
    filter(inputValue, path) {
        return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
    }
  
    render() {
      return (
        <div style={{ padding:'20px'}}>
            <Cascader
                options={options}
                onChange={onChange}
                placeholder="Please select"
                showSearch={{ filter }}
            />
        </div>
      );
    }
}