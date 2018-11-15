import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import InputMaxSuffix from '../inputMaxSuffix';
import styles from './index.module.less';

const AntdTextArea = Input.TextArea;

export default class TextArea extends React.Component {
  render() {
    const { value, defaultValue, maxLength } = this.props;
    if (typeof maxLength !== 'number' || maxLength <= 0) {
      return <AntdTextArea {...this.props} />;
    }
    return (
      <div className={styles.textArea}>
        <AntdTextArea {...this.props} />
        <div className="suffix">
          <InputMaxSuffix value={value || defaultValue} maxLength={maxLength} />
        </div>
      </div>
    );
  }
}
