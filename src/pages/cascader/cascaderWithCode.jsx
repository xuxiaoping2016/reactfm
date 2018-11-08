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
        code:"123456"
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
        code:"654321"
      }],
    }],
  }];

export default class CascaderWithCode extends Component {
    constructor(props){
        super(props);
    }

    handleAreaClick(e, label, option) {
        e.stopPropagation();
        console.log('clicked', label, option);
      }
      
    displayRender = (labels, selectedOptions) => labels.map((label, i) => {
        const option = selectedOptions[i];
        if (i === labels.length - 1) {
          return (
            <span key={option.value}>
              {label} (<a onClick={e => this.handleAreaClick(e, label, option)}>{option.code}</a>)
            </span>
          );
        }
        return <span key={option.value}>{label} / </span>;
    });

    render() {
        const arr = [
            <span key={1}>上海市 / </span>,
            <span key={2}>浦东新区 / </span>,
            <span key={3}>金桥镇 </span>
        ]
        return (
            <div style={{paddingbottom:"20px"}}>
                <p>自定义已选项： 例如给最后一项加上邮编链接</p>
                <Cascader
                    options={options}
                    defaultValue={['zhejiang', 'hangzhou', 'xihu']}
                    displayRender={this.displayRender}
                    style={{ width: '100%' }}
                />
                <div>{arr}</div>
            </div>
        )
    }
}