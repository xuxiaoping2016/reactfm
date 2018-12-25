/* 本控件仅限于ant.design Form 中使用 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import styles from './textarea.module.less';

const { TextArea } = Input;

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

  onChange = e => {
    const { maxLength, onChange } = this.props;
    const v = e.target.value;
    const originl = v.length;
    let len = 0;
    const ret = [];

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
    const { onChange, maxLength, type, placeholder, ...restProps } = this.props;

    const { len } = this.state;
    return (
      <div className={styles.textarea}>
        <TextArea
          {...restProps}
          type="textarea"
          onChange={this.onChange}
          placeholder={placeholder}
        />
        <span>
          {len > maxLength ? maxLength : Math.ceil(len)}/{maxLength}
        </span>
      </div>
    );
  }
}
