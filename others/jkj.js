import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Modal as AntModal, Button, LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import styles from './index.module.less';

/**
 * 全局 modal
 * 警告: `footer` 属性不再生效
 */
class Modal extends React.Component {
  static propTypes = {
    ...AntModal.propTypes,
    cancelText: PropTypes.string,
    okText: PropTypes.string,
    confirmLoading: PropTypes.bool,
    okType: PropTypes.string,
    hideOk: PropTypes.bool, // 隐藏 `确认` 按钮
    hideCancel: PropTypes.bool, // 隐藏 `取消` 按钮
    useCustomFooter: PropTypes.bool, // 外部自定义 footer
  };

  static defaultProps = {
    ...AntModal.defaultProps,
    cancelText: '取消',
    okText: '确认',
    confirmLoading: false,
    okType: 'primary',
    hideOk: false,
    hideCancel: false,
    useCustomFooter: false,
  };

  render() {
    const {
      className,
      cancelText,
      okText,
      confirmLoading,
      okType,
      okButtonProps,
      cancelButtonProps,
      onCancel,
      onOk,
      hideOk,
      hideCancel,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      footer,
      useCustomFooter,
      ...rest
    } = this.props;
    const footerComponent = !useCustomFooter && (
      <div className="modal-footer">
        {!hideOk && (
          <Button
            onClick={onOk}
            {...okButtonProps}
            loading={confirmLoading}
            type={okType}
          >
            {okText}
          </Button>
        )}
        {!hideCancel && (
          <Button onClick={onCancel} {...cancelButtonProps} type="default">
            {cancelText}
          </Button>
        )}
      </div>
    );
    return (
      <LocaleProvider locale={zhCN}>
        <AntModal
          onCancel={onCancel}
          {...rest}
          className={classnames(styles.modal, className)}
          footer={footerComponent}
        />
      </LocaleProvider>
    );
  }
}

Modal.info = options =>
  AntModal.info({
    ...options,
    className: classnames(styles.info, options.className),
  });

Modal.success = AntModal.success;

Modal.error = AntModal.error;

Modal.warning = AntModal.warning;

Modal.warn = AntModal.warn;

Modal.confirm = options => {
  // 这里必须 return
  const { width = 312, ...rest } = options;
  return AntModal.confirm({
    ...rest,
    className: classnames(styles.confirm, options.className),
    width,
  });
};

export default Modal;
