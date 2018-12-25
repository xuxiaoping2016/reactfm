import React from 'react';
import PropTypes from 'prop-types';
import identity from 'lodash/identity';
import { Pagination as AntdPagination, InputNumber, Button, Icon } from 'antd';

import styles from './index.module.less';

export default class Pagination extends React.Component {
  static defaultProps = {
    onChange: identity,
    total: 0,
    pageSize: 10,
    current: 1,
  };

  static propTypes = {
    ...AntdPagination.propTypes,
    onChange: PropTypes.func,
    total: PropTypes.number,
    pageSize: PropTypes.number,
    current: PropTypes.number,
  };

  state = {
    inputPage: undefined,
  };

  onInputChange = inputPage => {
    this.setState({ inputPage });
  };

  onPageChange = (current, size) => {
    const { onChange } = this.props;
    this.setState({ inputPage: '' });
    onChange(current, size);
  };

  onGoTo = () => {
    const { onChange } = this.props;
    const { inputPage } = this.state;
    if (typeof inputPage === 'number') {
      onChange(inputPage);
    }
  };

  itemRender = (page, type, originalElement) => {
    const { total, pageSize, current } = this.props;
    if (type === 'prev') {
      return (
        <Button disabled={current <= 1} className="pre">
          <Icon type="caret-left" />
        </Button>
      );
    }
    if (type === 'next') {
      return (
        <Button
          disabled={current > Math.floor(total / pageSize)}
          className="next"
        >
          <Icon type="caret-right" />
        </Button>
      );
    }
    return originalElement;
  };

  defaultShowTotal = () => {
    const { total, current } = this.props;
    return `共${total}条记录，当前为第${current}页`;
  };

  render() {
    const { total, pageSize } = this.props;
    const { inputPage } = this.state;

    return (
      <div className={styles.pagination}>
        <AntdPagination
          showTotal={this.defaultShowTotal}
          {...this.props}
          onChange={this.onPageChange}
          itemRender={this.itemRender}
          showQuickJumper={false}
        />
        <div className="right">
          <InputNumber
            value={inputPage}
            onChange={this.onInputChange}
            className="input"
            precision={0}
            min={1}
            max={Math.ceil(total / pageSize)}
          />
          <Button onClick={this.onGoTo} className="button">
            GO
          </Button>
        </div>
      </div>
    );
  }
}
