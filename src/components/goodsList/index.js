import React, { Component } from 'react';
import { Checkbox, Icon, Spin } from 'antd';
import Pagination from 'components/pagination';
import PropTypes from 'prop-types';

import styles from './index.module.less';

export default class GoodsList extends Component {
  static propTypes = {
    dataSource: PropTypes.shape({
      list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    }).isRequired,
    column: PropTypes.arrayOf(Object).isRequired,
    rowSelect: PropTypes.bool,
    title: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.func,
    ]),
    onSelectChange: PropTypes.func,
    selected: PropTypes.arrayOf(PropTypes.shape({})),
    onPageChange: PropTypes.func,
    loading: PropTypes.bool,
    showPagination: PropTypes.bool,
  };

  static defaultProps = {
    showPagination: true,
    selected: [],
    rowSelect: false,
    title: '',
    onSelectChange() {},
    loading: false,
    onPageChange() {},
  };

  onChoose = e => {
    const btn = e.target.checked;
    const {
      dataSource: { list },
      onSelectChange,
      selected,
    } = this.props;
    if (btn) {
      // 全选
      const data = [...list];
      onSelectChange(data);
    } else {
      onSelectChange([]);
    }
  };

  onSelect = (val, selected) => {
    const { list } = this.props.dataSource;
    const { onSelectChange } = this.props;
    const data = [...selected];

    const index = data.indexOf(val);
    if (index == -1) {
      data.push(val);
    } else {
      data.splice(index, 1);
    }
    onSelectChange(data);
  };

  render() {
    const {
      dataSource: { list = [], ...pagination },
      column,
      rowSelect,
      selected,
      title: ListTit,
      onPageChange,
      loading,
      showPagination,
    } = this.props;
    const { page: current, pageSize, totalCount: total } = pagination;

    const pageParam = {
      current,
      pageSize,
      total,
    };

    return (
      <div className="goods-list-container-only">
        <ul
          className="list-header"
          style={{ paddingLeft: rowSelect ? '40px' : '0' }}
        >
          {column.map((val, index) => {
            const child =
              index == 0 && rowSelect && list.length ? (
                <Checkbox
                  checked={selected.length && selected.length == list.length}
                  onChange={this.onChoose}
                />
              ) : null;
            return (
              <li key={index}>
                {child}
                {val.title}
              </li>
            );
          })}
        </ul>

        <ul className="list-body">
          {list.length ? null : <li className="no-data">暂无数据</li>}
          {list.map((val, index) => (
            <li
              key={index}
              className={rowSelect ? 'list-item select' : 'list-item'}
            >
              <div className="list-item-title">
                {rowSelect ? (
                  <Checkbox
                    checked={selected.indexOf(val) != -1}
                    onChange={this.onSelect.bind(this, val, selected)}
                  />
                ) : null}
                {typeof ListTit === 'string' ? '' : <ListTit data={val} />}
              </div>
              <div className="list-item-body">
                {column.map((item, index) => {
                  const text = val[item.key];

                  return (
                    <div className="item" key={index}>
                      {item.render(text, val)}
                    </div>
                  );
                })}
              </div>
            </li>
          ))}
        </ul>

        <Spin spinning={loading} className="spin" />
        {showPagination && total ? (
          <div className="list-pagination">
            <Pagination
              onChange={onPageChange}
              showTotal={() =>
                `共${Math.ceil(total / pageSize)}页，当前为第${current}页`
              }
              {...pageParam}
            />
          </div>
        ) : null}
      </div>
    );
  }
}
