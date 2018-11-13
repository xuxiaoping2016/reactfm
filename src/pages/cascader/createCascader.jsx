import React from 'react';
import PropTypes from 'prop-types';
import { Cascader as AntdCascader, Spin } from 'antd';
import { observer } from 'mobx-react';
import identity from 'lodash/identity';
import last from 'lodash/last';
import Selector from './model';

export default function createCascader(request, loadMoreRequest) {
  const store = new Selector(request);
  @observer
  class Cascader extends React.Component {
    static defaultProps = {
      ...AntdCascader.defaultProps,
      lazy: false,
      useCache: true,
      onFocus: identity,
      onLoad: identity,
      onError: identity,
      query: {},
      displayRender: label => last(label),
    };

    static propTypes = {
      ...AntdCascader.propTypes,
      lazy: PropTypes.bool,
      useCache: PropTypes.bool,
      onFocus: PropTypes.func,
      onLoad: PropTypes.func,
      onError: PropTypes.func,
      query: PropTypes.shape({}),
      displayRender: PropTypes.func,
    };

    componentWillMount() {
      const { lazy, useCache } = this.props;
    //   不是懒加载 不用缓存   || 不是懒加载 使用缓存，但缓存没有数据
      if (!lazy && (!useCache || store.data.length === 0)) {
        this.loadData();
      }
    }

    onFocus = () => {
        // 获取焦点时 有没有数据，没有数据加载数据并执行获取焦点的回调函数
      if (store.data.length === 0) {
        this.loadData();
      }
      this.props.onFocus();
    };

    loadData() {
        console.log("loadData")
      const { onLoad, onError, query } = this.props;
      return store.fetchData.call(this, query, onLoad, onError);
    }

    loadMore = selectedOptions => {
      const targetOption = selectedOptions[selectedOptions.length - 1];
      targetOption.loading = true;
      const id = targetOption.value;
      loadMoreRequest(id)
        .then(options => {
          if (options && options.length) {
            targetOption.children = options;
          } else {
            delete targetOption.isLeaf;
          }
          targetOption.loading = false;
          this.forceUpdate();
        })
        .catch(() => {
          targetOption.loading = false;
          this.forceUpdate();
        });
    };

    render() {
      const {
        children,
        lazy,
        useCache,
        onLoad,
        onError,
        query, // omit
        ...restProps
      } = this.props;

      if (typeof loadMoreRequest === 'function') {
        restProps.loadData = this.loadMore;
      }

      return (
        <AntdCascader
          changeOnSelect
          {...restProps}
          notFoundContent={store.loading ? <Spin size="small" /> : null}
          options={store.data}
          onPopupVisibleChange={this.onFocus}
        />
      );
    }
  }
  Cascader.store = store;
  return Cascader;
}
