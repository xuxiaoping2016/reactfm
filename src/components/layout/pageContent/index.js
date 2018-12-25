import React from 'react';
import PropTypes from 'prop-types';
import Crumbs from '../../crumbs';
import styles from './index.module.less';

export default function PageContentLayout(props) {
  const { titles, children, footer, className, contentWrapClassName } = props;

  return (
    <div className={`${styles.pageContent} ${className}`}>
      <div className={styles.scroller}>
        {titles.length > 0 ? (
          <div className={styles.title}>
            <Crumbs items={titles} />
          </div>
        ) : null}
        <div className={`${styles.contentWrap} ${contentWrapClassName}`}>
          {children}
        </div>
      </div>
      {footer ? <div className="shadow-footer">{footer}</div> : null}
    </div>
  );
}

PageContentLayout.propTypes = {
  titles: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node,
  footer: PropTypes.node,
  className: PropTypes.string,
  contentWrapClassName: PropTypes.string,
};

PageContentLayout.defaultProps = {
  titles: [],
  children: null,
  footer: null,
  className: '',
  contentWrapClassName: '',
};
