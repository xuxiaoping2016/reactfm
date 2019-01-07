/* 本控件仅限于ant.design Form 中使用 */

import React, { Component} from 'react';
import { Input } from 'antd'
import T from 'prop-types';

export default class CountText extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    maxLength: T.oneOfType([T.number, T.string])
  }

  static defaultProps = {
    maxLength: 200
  }

  remainingCharacters = () => {
    console.log("remainingCharacters")
    if (this.props.value) {

      return this.props.maxLength - this.props.value.toString().length;

    }    
    return this.props.maxLength;

  }
  onChange = (e) => {
    console.log('onChange1')
    const { value, maxLength, onChange } = this.props;

    if(e.target.value && e.target.value.toString().length <= maxLength) {
        
      onChange && onChange(e.target.value)

    } else {
        console.log('onChange2')
      onChange && onChange(e.target.value.substr(0, maxLength))

    }
      

  }
  render() {

    const { onChange, maxLength, type, placeholder, ...other } = this.props;

    return (
      <div>
        <Input
          {...other}
          type="text"
          onChange={this.onChange}
          placeholder={placeholder || `请输入文字,字数不能超过${maxLength}个`}
        />
        <p>
          剩余{this.remainingCharacters()}字
        </p>
      </div>
    )

  }
}