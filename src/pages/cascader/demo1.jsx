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

export default class CascaderDemo1 extends Component {
    constructor(props){
        super(props);
        this.state ={
            count:0
        }
    }

    onChange(value) {
        console.log(value);
    }

    displayRender(label,selectedOptions) {
        console.log(label,selectedOptions)
        return label[label.length - 1];
      }

    render() {
        return (
            <div>
                <p>demo1</p>
                <Cascader
                options={options}
                onChange={this.onChange}
                defaultValue={['zhejiang', 'hangzhou', 'xihu']}
                // expandTrigger="hover"
                // changeOnSelect
                displayRender={this.displayRender}
                placeholder="Please select" />
            </div>
        )
    }
}