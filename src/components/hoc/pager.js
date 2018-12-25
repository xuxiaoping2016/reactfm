import React from 'react';
import { Form } from 'antd';
import { action, observable, flow } from 'mobx';
import { observer } from 'mobx-react';
import get from 'lodash/get';
import merge from 'lodash/merge';

export class PagerModel {
  nameSpace = '';

  componentRef = null;

  form = null;

  onRequest = null;

  onError = null;

  format = null;

  @observable.ref
  error = null;

  @observable.ref
  pagination = {};

  @observable.ref
  query = {};

  @observable.ref
  data = [];

  @observable
  loading = false;

  @observable
  firstLoading = false;

  constructor(options) {
    Object.keys(options).forEach(key => {
      this[key] = options[key];
    });
  }

  @action.bound
  loadData = flow(function* fn(extraQuery = {}) {
    const additionalQuery = { ...extraQuery };
    const {
      pagination,
      query,
      componentRef,
      onError,
      onRequest,
      format: {
        beforeRequest,
        afterResponse,
        struct: {
          page: pageKey,
          size: sizeKey,
          total: totalKey,
          list: listKey,
        },
      },
    } = this;
    const nextPagination = { ...pagination };
    delete nextPagination[totalKey];
    if (typeof additionalQuery[pageKey] === 'number') {
      nextPagination[pageKey] = additionalQuery[pageKey];
      delete additionalQuery[pageKey];
    }
    if (typeof additionalQuery[sizeKey] === 'number') {
      nextPagination[sizeKey] = additionalQuery[sizeKey];
      delete additionalQuery[sizeKey];
    }
    const nextQuery = { ...query, ...additionalQuery };
    const finalArgs = beforeRequest.call(componentRef, {
      ...nextPagination,
      ...nextQuery,
    });

    if (!finalArgs) {
      return;
    }

    this.loading = true;
    if (this.data.length === 0) {
      this.firstLoading = true;
    }
    try {
      console.log('请求')
      const response = yield onRequest.call(componentRef, finalArgs);
      console.log("请求成功")
      this.loading = false;
      this.firstLoading = false;
      const formatedResponse = afterResponse.call(componentRef, response) || {};
      const list = get(formatedResponse, listKey);
      const total = get(formatedResponse, totalKey);

      nextPagination[totalKey] = typeof total === 'number' ? total : 0;
      this.data = Array.isArray(list) ? list : [];
      this.pagination = nextPagination;
      this.query = nextQuery;
    } catch (error) {
      this.loading = false;
      this.firstLoading = false;
      this.error = error;
      onError.call(componentRef, error);
    }
  });

  @action
  toPage = page => {
    const {
      format: {
        struct: { page: pageKey },
      },
    } = this;
    const paginationQuery = { [pageKey]: page };
    this.loadData(paginationQuery);
  };

  @action
  submit = page => {
    console.log('submit',this)
    const finalPage = typeof page === 'number' && page > 0 ? page : 1;
    const {
      form,
      format: {
        struct: { page: pageKey },
      },
    } = this;
    const paginationQuery = { [pageKey]: finalPage };
    if (form) {
      form.validateFields((err, formQuery) => {
        if (!err) {
          this.query = formQuery;
          this.loadData({ ...formQuery, ...paginationQuery });
        }
      });
    } else {
      this.loadData(paginationQuery);
    }
  };

  @action
  reset = () => {
    const { form } = this;
    if (form) {
      form.resetFields();
      this.query = form.getFieldsValue();
    } else {
      this.query = {};
    }
    this.submit(1);
  };

  @action
  reload = () => {
    this.loadData();
  };

  @action
  clear = () => {
    const {
      form,
      format: {
        struct: { page: pageKey },
      },
    } = this;
    if (form) {
      form.resetFields();
      this.query = form.getFieldsValue();
    } else {
      this.query = {};
    }
    this.data = [];
    this.error = null;
    this.componentRef = null;
    this.form = null;
    this.pagination[pageKey] = 1;
    this.loading = false;
    this.firstLoading = false;
  };

  @action
  freshSize = size => {
    const {
      format: {
        struct: { page: pageKey, size: sizeKey },
      },
    } = this;
    const paginationQuery = { [pageKey]: 1, [sizeKey]: size };
    this.loadData(paginationQuery);
  };

  @action
  freshData = nextData => {
    this.data = nextData;
  };

  setFields = () => {
    const { form } = this;
    if (form) {
      form.setFieldsValue(this.query);
    }
  };

  saveRef = componentRef => {
    this.componentRef = componentRef;
  };

  saveForm = form => {
    this.form = form;
  };
}

export const pagerModels = {};

/**
 * @public
 * @typedef Format
 * @property {object} struct 分页参数,resolve的数据的别名配置。比如pagination是{ pageNum:1, pageSize:10 }，
 * resolve的数据为{ list:[], totalCount:88 },那么struct应该配置为{ page:'pageNum', size:'pageSize',total: 'totalCount',list: 'list' }
 * @property {function} beforeRequest  请求发出之前对查询参数做进一步判断处理，接收query处理返回request最终的finalQuery，如果返回负性结果则请求终止不再执行。
 * @property {function} afterResponse  请求结果FulFilled后预先做判断处理，接受response参数返回最终结果（需要满足struct的别名配置），并且正对可能的数据格式做了容错处理。
 */

/**
 * @public
 * @typedef Options
 * @property {boolea} useForm 是否使用rc-form。（与rc-form有一定耦合，还有一部分不必要的重复渲染，抽出来最好）
 * @property {string} nameSpace 传递给子组件属性的命名空间。
 * @property {boolean} keepAlive  组件卸载的时候，是否保留查询条件，由于数据保存在mobx的model中，组件卸载时天然不会丢失数据。
 * @property {boolean} cachePage  组件卸载的时候，是否保留当前页查询到列表数据。
 * @property {function} onRequest 请求数据的接口函数，接收查询条件对象，返回一个resolve response的promise。
 * @property {function} onError    请求数据接口出错时的回调函数。
 * @property {object}   pagination  分页参数的结构，如{ pageNum:1, pageSize:10 }。
 * @property {Format}   format     ......
 */

/**
 * @public
 * @typedef NameSpacedPropsCapsule
 * @property {object} pagination 满足antd.Pagination属性格式的分页对象。
 * @property {object} query      除去pagination所有的查询参数，往往是rc-form收集的查询参数。
 * @property  {array} data       查询到的列表数据。
 * @property  {boolean} loading  request是否正在加载数据。
 * @property  {boolean} firstLoading 是否在加载第一页数据列表
 * @property  {function} loadData    在当前query参数的基础上，改变query的一部分参数，去查询数据，查询成功后插入的参数将覆盖原有的，
 * 比如loadData({ pageNum:2 })等价于toPage(2)。
 * @property  {function}  toPage     跳转到第几页,如toPage(2)。
 * @property  {function}  submit    确认pagination和rc-form收集的查询条件，并且请求数据成功后将覆盖上一次的查询参数。
 * @property   {function} reset     重置查询条件（query，确认pagination和rc），并且根据初始参数请求一次列表数据。
 * @property @private  {function} clear     ......
 * @property   {function}  freshSize  改变页码,如freshSize(20)。
 * @property   {function}  freshData  同步更新列表数据 ,（previousData）=> nextData。
 * @property   {function}  reload     使用当前查询参数，对列表数据进行一次加载刷新，常用于对数据列表做了一些增删改之后调用。
 */

/**
 * 分页查询列表数据高阶组件
 *
 * @param {Options} options
 */
export default function Pager(options) {
  const defaultOptions = {
    useForm: true,
    nameSpace: 'pager',
    keepAlive: false,
    cachePage: false,
    onRequest: Promise.resolve(null),
    onError: () => {},
    pagination: {},
    format: {
      struct: {
        size: 'pageSize',
        page: 'page',
        total: 'totalCount',
        list: 'list',
      },
      beforeRequest: query => query,
      afterResponse: response => response,
    },
  };
  const finalOptions = merge(defaultOptions, options);
  const model = new PagerModel(finalOptions);
  
  const {
    useForm,
    nameSpace,
    keepAlive,
    cachePage,
    format: { struct },
  } = finalOptions;
  pagerModels[nameSpace] = model;

  return WrappedComponent => {
    @observer
    class HOC extends React.Component {
      componentDidMount() {
        
        if (keepAlive) {
          if (!cachePage) {
            const page = model.pagination[struct.page] || 1;
            model.setFields();
            model.submit(page);
          } else if (model.data.length === 0) {
            model.setFields();
            model.submit(1);
          }
        } else {
          console.log('..///...')
          model.submit(1);
        }
      }

      componentWillUnmount() {
        if (!keepAlive) {
          model.clear();
        }
      }

      getPagination = () => {
        const { pagination, toPage } = model;
        return {
          current: pagination[struct.page],
          pageSize: pagination[struct.size],
          total: pagination[struct.total],
          onChange: toPage,
        };
      };

      saveRef = node => {
        const { form } = this.props;
        model.saveRef(node);
        if (typeof form === 'object') {
          model.saveForm(form);
        }
      };

      render() {
        const {
          query,
          data,
          loading,
          firstLoading,
          loadData,
          toPage,
          submit,
          reset,
          clear,
          freshSize,
          freshData,
          reload,
        } = model;
        const props = {
          /**
           * {NameSpacedPropsCapsule}
           */
          [nameSpace]: {
            pagination: this.getPagination(),
            query,
            data,
            loading,
            firstLoading,
            loadData,
            toPage,
            submit,
            reset,
            clear,
            freshSize,
            freshData,
            reload,
          },
        };
        return (
          <WrappedComponent ref={this.saveRef} {...props} {...this.props} />
        );
      }
    }
    const PagerHOC = useForm ? Form.create()(HOC) : HOC;
    PagerHOC.store = model;
    PagerHOC.displayName =
      WrappedComponent.displayName || WrappedComponent.name || 'PagerComponent';
    return PagerHOC;
  };
}
