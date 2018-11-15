import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'antd';
import styles from './index.module.less';

const Item = Breadcrumb.Item;

function Crumbs({ items }) {
  return (
    <Breadcrumb className={styles.crumbs} separator="-">
      {items.map((name, index) => (
        <Item key={index}>{name}</Item>
      ))}
    </Breadcrumb>
  );
}

Crumbs.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Crumbs;
