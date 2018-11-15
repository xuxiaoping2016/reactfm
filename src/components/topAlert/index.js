import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Alert as AntAlert, Icon } from 'antd';
import style from './index.module.less';

const statusType = {
  0: {
    text: '',
  },
  1: {
    text: '待提审',
  },
  2: {
    text: '审核中',
  },
  3: {
    text: '审核通过',
  },
  4: {
    text: '审核拒绝',
  },
};
export default class TopAlert extends React.Component {
  render() {
    const { value: status = 0, ...reset } = this.props;
    const alertType = statusType[status] ? statusType[status] : statusType['0'];
    const classNames = classnames(style.alert, {
      [`alert-${status}`]: true,
    });
    const iconProp =
      status == 4 ? { iconType: 'exclamation-circle', showIcon: true } : {};

    return (
      <AntAlert
        {...iconProp}
        message={`审核状态:${alertType.text}`}
        {...reset}
        className={classNames}
      />
    );
  }
}
TopAlert.propTypes = {
  value: PropTypes.number, // eslint-disable-line react/require-default-props
};
