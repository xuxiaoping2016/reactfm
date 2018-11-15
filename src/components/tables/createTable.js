import React from 'react';
import PropTypes from 'prop-types';
import { Table as AntTable } from 'antd';

import './uiStyles/index.less';

export default function createTable(type) {
  return class Table extends React.Component {
    static propTypes = {
      ...AntTable.propTypes,
      pagination: PropTypes.bool,
    };

    static defaultProps = {
      ...AntTable.defaultProps,
      pagination: false,
    };

    render() {
      return (
        <div className={`ui-${type}-table`}>
          <AntTable {...this.props} pagination={this.props.pagination} />
        </div>
      );
    }
  };
}
