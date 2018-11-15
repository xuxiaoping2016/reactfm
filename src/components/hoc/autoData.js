import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { Form } from 'antd';
import merge from 'lodash/merge';
import autobind from 'utils/autobind';

export default function AutoData(config) {
  config = merge(
    {
      namespace: '$data',
      keepalive: true, // 组件销毁后再次加载，是否保存销毁前数据
      cachePage: false, // 组件销毁后再次加载，是否刷新销毁前页面的数据，其他数据同keepalive===true
      beforeRequest: () => true,
      // onRequest: undefined,//function
      // onError: undefined,//function
      // onRequest,onError函数的this为装饰的类的实例
      pagination: null,
      format: {
        size: 'size',
        page: 'page',
        total: 'total',
        data: 'data',
      },
    },
    config
  );

  return WrappedComponent => {
    class AutoDataHOC extends React.Component {
      static propTypes = {
        form: PropTypes.shape({
          validateFields: PropTypes.func.isRequired,
          getFieldsValue: PropTypes.func.isRequired,
          resetFields: PropTypes.func.isRequired,
          setFieldsValue: PropTypes.func.isRequired,
        }).isRequired,
      };

      constructor(props) {
        super(props);
        this.state = {
          data: [],
          loading: false,
          fieldsQuery: {},
          pagination: config.pagination || null,
          error: null,
          total: 0,
        };
        autobind(this, ['submit', 'reset', 'toPage', 'loadData', 'updateData']);
        this.bindRef = node => (this.component = node);
      }

      updateData(nextData) {
        this.setState({ data: nextData });
      }

      submit() {
        this.props.form.validateFields(err => {
          if (!err) {
            this.reload();
          }
        });
      }

      reset() {
        this.props.form.resetFields();
        this.reload();
      }

      toPage(page, size) {
        const additionalQuery = { [config.format.page]: page };
        if (typeof size === 'number') {
          additionalQuery[config.format.size] = size;
        }
        return this.loadData(additionalQuery);
      }

      reload() {
        return this.loadData({ [config.format.page]: 1 });
      }

      async loadData(additionalQuery = {}) {
        if (typeof config.onRequest !== 'function') {
          return;
        }
        const {
          size: sizeKey,
          page: pageKey,
          total: totalKey,
          data: dataKey,
        } = config.format;
        const fieldsQuery = this.props.form.getFieldsValue();
        const prePagination = this.state.pagination;
        let pagination = null;
        if (prePagination) {
          pagination = {
            [pageKey]: additionalQuery[pageKey] || prePagination[pageKey],
            [sizeKey]: additionalQuery[sizeKey] || prePagination[sizeKey],
          };
        }
        const query = {
          ...fieldsQuery,
          ...pagination,
          ...additionalQuery,
        };
        if (!config.beforeRequest.call(this.component, query)) {
          return;
        }
        this.setState({ loading: true });
        try {
          const response = await config.onRequest.call(this.component, query);
          this.setState({
            fieldsQuery,
            pagination,
            loading: false,
            data: get(response, dataKey, []),
            total: get(response, totalKey, this.state.total || 0),
          });
          return response;
        } catch (error) {
          if (typeof config.onError === 'function') {
            config.onError.call(this.component, error);
          }
          this.setState({ error, loading: false });
        }
      }

      componentWillUnmount() {
        if (config.keepalive) {
          AutoDataHOC.preLifeCycleState = this.state;
        }
      }

      componentDidMount() {
        const { preLifeCycleState } = AutoDataHOC;
        if (config.keepalive && typeof preLifeCycleState === 'object') {
          this.props.form.setFieldsValue(preLifeCycleState.fieldsQuery);
          if (config.cachePage) {
            this.setState({ ...preLifeCycleState });
          } else {
            this.setState({ ...preLifeCycleState, data: [] }, () => {
              this.loadData({
                [config.format.page]:
                  preLifeCycleState.pagination[config.format.page],
              });
            });
          }
          return;
        }
        this.reload();
      }

      render() {
        const {
          data,
          loading,
          pagination,
          error,
          total,
          fieldsQuery,
        } = this.state;
        const props = {
          [config.namespace]: {
            loading,
            data,
            error,
            total,
            submit: this.submit,
            reset: this.reset,
            toPage: this.toPage,
            loadData: this.loadData,
            updateData: this.updateData,
            query: { ...fieldsQuery, ...pagination },
          },
        };

        return (
          <WrappedComponent ref={this.bindRef} {...props} {...this.props} />
        );
      }
    }

    return Form.create()(AutoDataHOC);
  };
}
