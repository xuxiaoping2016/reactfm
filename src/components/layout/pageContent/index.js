import React from 'react';
import { SizeMe } from 'react-sizeme';
import PropTypes from 'prop-types';
import Crumbs from '../../crumbs';
import styles from './index.module.less';

export default function PageContentLayout(props) {
  const { titles, children, footer, loading } = props;
  let content;
  if (typeof children === 'function') {
    content = (
      <SizeMe monitorHeight>
        {({ size }) => (
          <div className={styles.scroll}>
            <div className={styles.content}>{children(size)}</div>
          </div>
        )}
      </SizeMe>
    );
  } else {
    content = (
      <div className={styles.scroll}>
        <div className={styles.content}>{children}</div>
      </div>
    );
  }

  return (
    <div className={styles.pageContent}>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {titles ? (
          <div className={styles.titles}>
            <Crumbs items={titles} />
          </div>
        ) : null}
        {content}
      </div>
      {footer}
    </div>
  );
}

PageContentLayout.propTypes = {
  titles: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.oneOfType(PropTypes.func, PropTypes.node),
  footer: PropTypes.node,
  loading: PropTypes.bool,
};

PageContentLayout.defaultProps = {
  titles: [],
  children: null,
  footer: null,
  loading: false,
};
