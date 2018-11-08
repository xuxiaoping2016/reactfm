import React, {Component} from 'react';
import { Cascader } from 'antd';

const options = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    disabled: true,
    children: [{
      value: 'hangzhou',
      label: 'Hangzhou',
    }],
  }, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
      value: 'nanjing',
      label: 'Nanjing',
    }],
  }];

export default class CitySwitcher extends Component {
    state = {
        text: 'Unselect',
    };

    onChange = (value, selectedOptions) => {
        console.log(value,selectedOptions)
        this.setState({
            text: selectedOptions.map(o => o.label).join(', '),
        });
    }

    render() {
        return (
            <div style={{padding:"20px 0"}}>
                {this.state.text}
                &nbsp;
                <Cascader options={options} onChange={this.onChange}>
                <a href="#">Change city</a>
                </Cascader>
            </div>
        )
    }
}