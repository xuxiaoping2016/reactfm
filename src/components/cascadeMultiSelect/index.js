/*eslint-disable*/
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import cloneDeep from 'lodash/cloneDeep';
import classnames from 'classnames';
import { flushUnCheck, flushCheck, generateSet } from './utils';
import './index.module.less';

class CascadeMultiSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedDataSet: [],
      checkKeysMap: {},
    };
    //flushUnCheck, flushCheck队列推断，只能从低向上推出一条链上所有节点的全选，半选，不选状态
    this.checkStock = [];
    this.unCheckStock = [];
  }
  componentWillMount() {
    const { options, value } = this.props;
    this.setFocusedDataSet(options);
    this.setCheckedKeysMap(value);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.options !== this.props.options) {
      this.setFocusedDataSet(nextProps.options);
    } else if (nextProps.value !== this.props.value) {
      this.setCheckedKeysMap(nextProps.value);
    }
  }
  setCheckedKeysMap(value) {
    let checkKeysMap = {},
      stock = value.slice(0),
      current = null;
    while ((current = stock.pop())) {
      if (current.halfChecked) {
        checkKeysMap[current.key] = 1; //half checked
      } else {
        checkKeysMap[current.key] = 2; //all checked
      }
      if (current.children) {
        stock.push(...current.children);
      }
    }
    this.setState({ checkKeysMap });
    return checkKeysMap;
  }
  setFocusedDataSet(nextOptions) {
    const focusedDataSet = [{ options: nextOptions }];
    this.setState({ focusedDataSet });
  }
  updateFocusedDataItem(itemData, level) {
    const nextFocusedDataSet = this.state.focusedDataSet.slice(0, level + 1);
    nextFocusedDataSet[level + 1] = itemData;
    this.setState({ focusedDataSet: nextFocusedDataSet });
  }
  removeLastFocusedDataItem() {
    const { focusedDataSet } = this.state;
    const nextFocusedDataSet = focusedDataSet.slice(
      0,
      focusedDataSet.length - 1
    );
    this.setState({ focusedDataSet: nextFocusedDataSet });
  }
  check(predecessors, item) {
    let value = cloneDeep(this.props.value),
      first = { children: this.state.focusedDataSet[0].options },
      predecessorList = [first, ...predecessors, item],
      current = { children: value },
      index,
      siblings,
      insertIndex,
      j,
      sibling,
      temp;

    this.checkStock = [current];

    predecessorList.slice(1).forEach((predecessor, i) => {
      index = current.children.findIndex(({ key }) => key === predecessor.key);
      if (index === -1) {
        siblings = predecessorList[i].children;
        insertIndex = 0;
        for (j = 0; j < siblings.length; j++) {
          sibling = siblings[j];
          if (current.children.some(i => i.key === sibling.key)) {
            insertIndex++;
          }
          if (sibling.key === predecessor.key) {
            break;
          }
        }
        const { children, ...rest } = predecessor;
        if (children) {
          rest.children = [];
        }
        current.children.splice(insertIndex, 0, rest);
        current = current.children[insertIndex];
      } else {
        temp = current.children[index];
        if (!temp.children) {
          temp.children = [];
        }
        current = temp;
      }
      this.checkStock.push(current);
    });
    flushCheck(predecessorList, this.checkStock);
    this.props.onChange(value);
  }
  unCheck(predecessors, item) {
    let value = cloneDeep(this.props.value),
      predecessorList = predecessors.concat(item),
      current = { children: value },
      predecessor,
      i;

    this.unCheckStock = [current];

    for (i = 0; i < predecessorList.length; i++) {
      predecessor = predecessorList[i];
      parent = current;
      current = current.children.find(item => item.key === predecessor.key);
      if (current) {
        if (!current.children && predecessor.children) {
          current.children = predecessor.children.map(
            ({ children, ...item }) => item
          );
        }
      } else {
        const { children, ...rest } = predecessor;
        rest.children = [];
        current = rest;
      }
      this.unCheckStock.push(current);
    }
    flushUnCheck(predecessors, this.unCheckStock);
    this.props.onChange(value);
  }
  onItemCheck(item, indexs, checkedType) {
    let current = this.state.focusedDataSet[0].options[indexs[0]],
      predecessors = current ? [current] : [];
    for (let i = 1; i < indexs.length; i++) {
      current = current.children[indexs[i]];
      predecessors.push(current);
    }
    if (checkedType === 2) {
      this.unCheck(predecessors, item);
    } else {
      this.check(predecessors, item);
    }
  }
  onItemClick(item, index, level) {
    const { lazy, loadData } = this.props;
    if (item.isLeaf) {
      return;
    }

    if (item.children && item.children.length) {
      const focusedData = { options: item.children, index };
      this.updateFocusedDataItem(focusedData, level);
      return;
    }
    const focusedData = { index };
    item.loading = true;
    this.updateFocusedDataItem(focusedData, level);
    if (!lazy) {
      return;
    }
    loadData(item)
      .then(options => {
        delete item.loading;
        if (Array.isArray(options) && options.length) {
          item.children = options;
          const focusedData = { options, index };
          this.updateFocusedDataItem(focusedData, level, index);
        } else {
          item.isLeaf = true;
          this.removeLastFocusedDataItem();
        }
      })
      .catch(() => {
        delete item.loading;
        this.removeLastFocusedDataItem();
      });
  }
  render() {
    const { lazy } = this.props;
    const { focusedDataSet, checkKeysMap } = this.state,
      allIndexs = focusedDataSet.slice(1).map(({ index }) => index),
      len = focusedDataSet.length + 1,
      checkAllSet = generateSet(len);

    return (
      <div className="cascade-multi-select">
        <div className="cascade-multi-select-sections">
          {focusedDataSet.map(({ options }, level) => {
            if (!Array.isArray(options)) {
              return null;
            }
            return (
              <div key={level} className="cascade-multi-select-section">
                <div>
                  {options.map((item, index) => {
                    const { key, title, disabled, loading } = item,
                      checkedType = checkKeysMap[key],
                      focused = index === allIndexs[level],
                      checked = checkedType === 2 || checkAllSet[level],
                      finalCheckedType = checked ? 2 : checkedType,
                      itemClassName = classnames(
                        'cascade-multi-select-section-item',
                        { focused: focused }
                      ),
                      checkBoxClassName = classnames(
                        'cascade-multi-select-checkbox',
                        {
                          'cascade-multi-select-checkbox-indeterminate':
                            checkedType === 1,
                          'cascade-multi-select-checkbox-checked': checked,
                          'cascade-multi-select-checkbox-disabled': disabled,
                        }
                      );

                    //如果一个节点，只要链上有一个predecessor选中，则选中（全选）
                    if (checked && focused) {
                      checkAllSet[level + 1] = true;
                    }

                    return (
                      <div
                        onClick={() => this.onItemClick(item, index, level)}
                        className={itemClassName}
                        key={key}
                      >
                        <span
                          onClick={() => {
                            if (!disabled) {
                              const indexs = allIndexs.slice(0, level);
                              this.onItemCheck(item, indexs, finalCheckedType);
                            }
                          }}
                          className={checkBoxClassName}
                        >
                          <span className="cascade-multi-select-checkbox-inner" />
                        </span>
                        <span
                          title={title}
                          className="cascade-multi-select-section-item-label"
                        >
                          {title}
                        </span>
                        {loading && lazy && (
                          <Icon type="loading" theme="outlined" />
                        )}
                        {!loading && focused && (
                          <span className="caret-right" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

CascadeMultiSelect.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      title: PropTypes.string,
      children: PropTypes.arrayOf(PropTypes.shape({})),
      disabled: PropTypes.bool,
    })
  ),
  value: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      title: PropTypes.string,
      halfChecked: PropTypes.bool,
      children: PropTypes.arrayOf(PropTypes.shape({})),
      isLeaf: PropTypes.bool,
    })
  ),
  onChange: PropTypes.func,
  lazy: PropTypes.bool,
  loadData: PropTypes.func,
  //子节点异步加载函数，lazy === true,必须传,返回一个promise对象
};

CascadeMultiSelect.defaultProps = {
  options: [],
  value: [],
  onChange: () => null,
  loadData: () => Promise.resolve(null),
  lazy: false,
};

export default CascadeMultiSelect;
