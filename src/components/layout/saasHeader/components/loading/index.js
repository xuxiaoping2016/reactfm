import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './index.module.less';

export default class Loading extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
  };

  render() {
    const { loading } = this.props;
    return (
      <div className={style.saasLoadingWrapper}>
        {loading ? <div className={style.loading}>数据加载中...</div> : null}
      </div>
    );
  }
}
