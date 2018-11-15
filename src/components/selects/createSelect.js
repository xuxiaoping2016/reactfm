import React from 'react';
import PropTypes from 'prop-types';
import { Select as AntdSelect, Spin } from 'antd';
import { observer } from 'mobx-react';
import identity from 'lodash/identity';
import Selector from './model';

export default function createSelect(request) {
  const store = new Selector(request);
  @observer
  class Select extends React.Component {
    static defaultProps = {
      ...AntdSelect.defaultProps,
      lazy: false,
      useCache: true,
      onFocus: identity,
      onLoad: identity,
      onError: identity,
      query: {},
    };

    static propTypes = {
      ...AntdSelect.propTypes,
      children: PropTypes.func.isRequired,
      lazy: PropTypes.bool,
      useCache: PropTypes.bool,
      onFocus: PropTypes.func,
      onLoad: PropTypes.func,
      onError: PropTypes.func,
      query: PropTypes.shape({}),
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
      this.props.onFocus();
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
      return (
        <AntdSelect
          {...restProps}
          notFoundContent={store.loading ? <Spin size="small" /> : null}
          onFocus={this.onFocus}
        >
          {children(store.data)}
        </AntdSelect>
      );
    }
  }
  Select.Option = AntdSelect.Option;
  Select.store = store;
  return Select;
}
