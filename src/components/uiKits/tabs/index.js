import React from 'react';
import PropTypes from 'prop-types';
import { Tabs as AntdTabs } from 'antd';
import styles from './index.module.less';

const { TabPane } = AntdTabs;

function Tabs(props) {
  const { children, ...restProps } = props;
  return (
    <div className={styles.tabs}>
      <AntdTabs {...restProps}>{children}</AntdTabs>
    </div>
  );
}

Tabs.TabPane = TabPane;

Tabs.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Tabs.defaultProps = {
  className: '',
};

export default Tabs;
