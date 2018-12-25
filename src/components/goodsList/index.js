import React, { Component } from 'react';
import { Checkbox, Spin } from 'antd';
import PT from 'prop-types';

import './index.module.less';

export default class GoodsList extends Component {
  static propTypes = {
    list: PT.arrayOf(PT.object).isRequired,
    column: PT.arrayOf(Object).isRequired,
    rowSelect: PT.shape({
      onSelectChange: PT.func,
    }),
    title: PT.oneOfType([PT.string, PT.object, PT.func]),
    loading: PT.bool,
    className: PT.string,
  };

  static defaultProps = {
    // 只要有选择功能，rowSelect的三个字段都传递
    rowSelect: {
      show: false, // 是否展示选择框
      selected: [], // 默认选中项
      onSelectChange(selectedRows) {
        // 选框变化后的回调函数  参数为选中的列表
        console.log(selectedRows);
      },
    },
    title: '',
    loading: false,
    className: '',
  };

  // 处理全选 全不选
  handleSelectAll = e => {
    const btn = e.target.checked;
    const {
      list,
      rowSelect: { onSelectChange },
    } = this.props;

    const data = btn ? [...list] : [];
    // this.setState({ selected: data });
    onSelectChange && onSelectChange(data);
  };

  onSelect = val => {
    const {
      rowSelect: { onSelectChange, selected },
    } = this.props;
    const index = selected.indexOf(val);
    if (index == -1) {
      selected.push(val);
    } else {
      selected.splice(index, 1);
    }
    onSelectChange && onSelectChange(selected);
  };

  render() {
    const {
      list = [],
      column,
      title: ListTit,
      loading,
      rowSelect: { show, selected },
      className,
    } = this.props;

    return (
      <div className={`goods-list-container-only ${className}`}>
        <ul
          className="list-header"
          style={{ paddingLeft: show ? '40px' : '0' }}
        >
          {column.map((val, index) => {
            const child =
              index == 0 && show && list.length ? (
                <Checkbox
                  checked={selected.length && selected.length === list.length}
                  onChange={this.handleSelectAll}
                />
              ) : null;
            return (
              <li
                key={index}
                className={index === 0 && show ? 'has-choose' : ''}
                style={{ flex: val.width }}
              >
                {child}
                {val.title}
              </li>
            );
          })}
        </ul>
        <Spin spinning={loading}>
          <ul className="list-body">
            {list.length ? null : <li className="no-data">暂无数据</li>}
            {list.map((val, index) => (
              <li
                key={index}
                className={show ? 'list-item select' : 'list-item'}
              >
                <div className="list-item-title">
                  {show ? (
                    <Checkbox
                      checked={selected.indexOf(val) != -1}
                      onChange={this.onSelect.bind(this, val)}
                    />
                  ) : null}
                  {typeof ListTit === 'function' ? (
                    <ListTit record={val} />
                  ) : (
                    ListTit
                  )}
                </div>
                <div className="list-item-body">
                  {column.map((item, index) => {
                    const text = val[item.key];

                    return (
                      <div
                        className="item"
                        key={index}
                        style={{ flex: item.width }}
                      >
                        {item.render ? item.render(text, val) : text}
                      </div>
                    );
                  })}
                </div>
              </li>
            ))}
          </ul>
        </Spin>
      </div>
    );
  }
}
