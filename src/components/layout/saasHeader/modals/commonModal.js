import React, { Component } from 'react';
import { Modal as AntdModal } from 'antd';
import style from './commonModal.module.less';

export default class CommonModal extends Component {
  static propTypes = {
    ...AntdModal.propTypes,
  };

  static defaultProps = {
    ...AntdModal.defaultProps,
  };

  render() {
    const { children, ...rest } = this.props;

    return (
      <AntdModal
        {...rest}
        className={style.commonModal}
        centered
        footer={null}
        width={800}
        height={500}
      >
        <div className={style.modalBody}>{children}</div>
      </AntdModal>
    );
  }
}
