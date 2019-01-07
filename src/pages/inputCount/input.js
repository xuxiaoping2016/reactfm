/* 本控件仅限于ant.design Form 中使用 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
// import styles from './input.module.less';

export default class InputCount extends Component {
  static propTypes = {
    maxLength: PropTypes.number,
    ignore: PropTypes.bool,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    maxLength: 20,
    ignore: false,
    onChange: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      len: 0,
    };
  }

  enteredCharacters = () => {
    const { maxLength, ignore, value } = this.props;
    
    let extent = 0;
    if(!ignore){
      const ret = (value || '').match(/[\u4e00-\u9fa5]+/g) || [];
      const l = ret.join('').length; //中文字符个数
      extent = l + Math.ceil(((value || '').length - l)/2);
    }else{
      extent = value.length;
    }
    
    const len = extent < maxLength ? extent : maxLength;
    console.log(len,'计算')
    return len
  }

  onChange = e => {
    const { maxLength, ignore, onChange, value } = this.props;
    const v = e.target.value || ''
    const originl = v.length;
    let len = 0;
    const ret = [];
    let i = 0

    if (!ignore) {
      for (i = 0; i < originl; i+1) {
        len += /[\u4e00-\u9fa5]/.test(v[i]) ? 1 : 0.5;
        ret.push(v[i]);

        if (len >= maxLength) {
          break;
        }
      }
    } else {
      len = originl < maxLength ? originl : maxLength;
    }

    
    const val = !ignore ? ret.join('') : e.target.slice(0, len);
    onChange(val);
    
  };

  render() {
    const { onChange, maxLength, placeholder, ignore, ...other } = this.props;
    const { len } = this.state;


    return (
      <Input
        // className={styles['input-wrap']}
        type="text"
        {...other}
        suffix={
          <span>
            {this.enteredCharacters()}/{maxLength}
          </span>
        }
        onChange={this.onChange}
        placeholder={placeholder || `请输入文字,字数不能超过${maxLength}个`}
      />
    );
  }
}

/* 
* 本控件仅限于ant.design Form 中使用
* @property {number} maxLength 可选 默认值20  最多输入字符个数 
* @property {number} ignore  可选 默认值false 是否区不分中文与非中文，进行无差别计数
                              false 差别计数 中文算1个字符，非中文算0.5个字符，
                              true 不区分  中文与非中文 都算1个字符
* @property {function} onChange  input值改变后的回调函数
*/

/* 
<FormItem>
  {getFieldDecorator('key', {
    initialValue: key,
  })(<InputCount maxLength={20} />)}
</FormItem>
*/
