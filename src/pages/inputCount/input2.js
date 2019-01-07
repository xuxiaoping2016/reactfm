/* 本控件仅限于ant.design Form 中使用 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

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

  // 初始化时计算默认值的字数个数
  componentDidMount() {
    // const { value } = this.props;
    // if (value) {
    //   this.onChange(value);
    // }
  }

  // 异步赋值时计算字数个数
  componentWillReceiveProps(nextProps) {
    console.log('..componentWillReceiveProps.',nextProps)
    if (nextProps.value === undefined) return;
    if (nextProps.value !== this.props.value) {
      console.log('diaoyong')
      this.onChange(nextProps.value);
    }
  }

  onChange = e => {
    console.log('onChange')
    const { maxLength, ignore, onChange } = this.props;
    const v = typeof e === 'string' ? e : e.target.value;
    const originl = v.length;
    let len = 0;
    const ret = [];

    if (!ignore) {
      for (let i = 0; i < originl; i++) {
        len += /[\u4e00-\u9fa5]/.test(v[i]) ? 1 : 0.5;

        if (len > maxLength) {
          break;
        } else {
          ret.push(v[i]);
        }
      }
    } else {
      len = originl <= maxLength ? originl : maxLength;
    }

    this.setState({ len });
    const val = !ignore ? ret.join('') : v.slice(0, len);

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
            {len > maxLength ? maxLength : Math.ceil(len)}/{maxLength}
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
