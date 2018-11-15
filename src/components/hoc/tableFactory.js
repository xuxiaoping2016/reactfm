import React from 'react';
import { inject } from 'mobx-react';
import { mapValues } from 'lodash';

const TableFactory = ({
  getAction,
  params = {},
  format = p => p,
}) => Component => {
  @inject('ParamsStore')
  class WrapperComponent extends React.Component {
    constructor(props) {
      super(props);
      const { pathQuery } = this.props.ParamsStore;
      this.state = {
        query: {
          page: 1,
          pageSize: 10,
          ...(pathQuery || {}),
          ...params,
        },
        data: {},
        isLoading: false,
      };
    }

    componentDidMount() {
      this.loadData();
    }

    onFilter = queryParams => {
      const { query } = this.state;
      const { setPathQuery } = this.props.ParamsStore;
      this.setState({ query: { ...query, ...queryParams } });
      setPathQuery({ ...query, ...queryParams });
    };

    onConfirmFilter = (queryParams = {}, cb = () => {}) => {
      const { query } = this.state;
      let current = 1;
      if (Object.keys(queryParams).some(p => p === 'page')) {
        current = queryParams.page;
      }
      const { setPathQuery } = this.props.ParamsStore;
      this.setState(
        { query: { ...query, ...queryParams, page: current } },
        () => {
          setPathQuery({ ...query, ...queryParams, page: current });
          this.loadData();
          cb();
        }
      );
    };

    onResetFilters = () => {
      const { query } = this.state;
      const emptyQuery = {
        ...mapValues(query, p => ''),
        page: 1,
        pageSize: 20,
      };
      this.onConfirmFilter(emptyQuery);
    };

    loadData = async () => {
      this.setState({ isLoading: true });
      const { query } = this.state;
      const data = await getAction(format(query));
      this.setState({ data: (data || {}).data || {}, isLoading: false });
    };

    render() {
      const definedProps = {
        ...this.state,
        ...this.props,
        loadData: this.loadData,
        onFilter: this.onFilter,
        onConfirmFilter: this.onConfirmFilter,
        onReset: this.onResetFilters,
      };
      return <Component {...definedProps} />;
    }
  }
  return WrapperComponent;
};

export default TableFactory;
