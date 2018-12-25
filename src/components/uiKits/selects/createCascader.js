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
      // eslint-disable-next-line react/forbid-foreign-prop-types
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
      if (!lazy && (!useCache || store.data.length === 0)) {
        this.loadData();
      }
    }

    onFocus = () => {
      if (store.data.length === 0) {
        this.loadData();
      }
      // eslint-disable-next-line react/destructuring-assignment
      this.props.onFocus();
    };

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

    loadData() {
      const { onLoad, onError, query } = this.props;
      return store.fetchData.call(this, query, onLoad, onError);
    }

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
