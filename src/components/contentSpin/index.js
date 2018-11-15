import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';

const style = { width: '100%', height: '100%' };

export default function ContentSpin(props) {
  const { children, loading, ...restProps } = props;
  return loading ? (
    <Spin {...restProps}>{children || <div style={style} />}</Spin>
  ) : (
    children
  );
}

ContentSpin.propTypes = {
  children: PropTypes.node,
  loading: PropTypes.bool,
};

ContentSpin.defaultProps = {
  children: null,
  loading: false,
};
