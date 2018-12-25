/* 本控件仅限于ant.design Form 中使用 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import styles from './input.module.less';

export default class CountText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      len: 0,
    };
  }

  static propTypes = {
    maxLength: PropTypes.number,
  };

  static defaultProps = {
    maxLength: 200,
  };

  componentDidMount() {
    const { value } = this.props;
    if (value) {
      this.onChange(value);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value == undefined) return;
    if (nextProps.value != this.props.value) {
      this.onChange(nextProps.value);
    }
  }

  onChange = e => {
    const { maxLength, onChange } = this.props;
    const v = typeof e === 'string' ? e : e.target.value;
    const originl = v.length;
    let len = 0;
    const ret = [];
    // const ret = v.match(/[\u4e00-\u9fa5]+/g) || [];
    // const l = ret.join('').length;
    // const len = l + Math.ceil((v.length - l)/2);
    for (let i = 0; i < originl; i++) {
      len += /[\u4e00-\u9fa5]/.test(v[i]) ? 1 : 0.5;

      if (len > maxLength) {
        break;
      } else {
        ret.push(v[i]);
      }
    }
    this.setState({ len });

    onChange && onChange(ret.join(''));
  };

  render() {
    const { onChange, maxLength, type, placeholder, ...other } = this.props;
    const { len } = this.state;
    return (
      <Input
        className={styles['input-wrap']}
        {...other}
        type="textarea"
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
