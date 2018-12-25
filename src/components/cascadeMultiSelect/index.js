/*eslint-disable*/
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  flushUnCheck,
  flushCheck,
  deepClone,
  getCheckedKeysMap,
  getPanelsByKeys,
} from './utils';
import './index.module.less';

const isControlled = props => 'value' in props;

class CascadeMultiSelect extends React.Component {
  //替代UNSAFE_componentWillMount与UNSAFE_componentWillReceiveProps的新lifeCycle
  static getDerivedStateFromProps(nextProps, prevState) {
    const { value = [], options, defaultExpandedPanels } = nextProps;
    //需要更新的状态
    const ret = {};
    //选中的值更新,受控状态下才执行
    if (value !== prevState.lastValue) {
      if (isControlled(nextProps)) {
        ret.checkKeysMap = getCheckedKeysMap(value);
      } else if ('defaultValue' in nextProps && !prevState.lastValue) {
        ret.checkKeysMap = getCheckedKeysMap(nextProps.defaultValue);
      }
      ret.lastValue = value;
    }
    //选项更新
    if (options !== prevState.lastOptions) {
      ret.activeItems =
        defaultExpandedPanels.length > 0
          ? getPanelsByKeys(options, defaultExpandedPanels)
          : [{ options }];
      ret.lastOptions = options;
    }
    //返回空对象不更新
    return ret;
  }

  constructor(props) {
    super(props);
    this.state = {
      //面板展示的选项列表数据
      activeItems: [],
      //记录选择状态的map，全选-2，半选-1，不选状态-0）
      checkKeysMap: {},
    };
    this.checkStack = [];
    this.unCheckStack = [];
    //传了loadData为返回promise的函数，表示需要动态加载选择节点上的数据
    this.lazy = typeof props.loadData === 'function';
  }
  getClonedValue() {
    const { value, defaultValue } = this.props;
    return deepClone(value || this.defaultValue || defaultValue);
  }
  onChange(value) {
    const { onChange } = this.props;
    const finalValue = value.length > 0 ? value : undefined;
    onChange(finalValue);
    if (!isControlled(this.props)) {
      this.defaultValue = value;
      this.setState({ checkKeysMap: getCheckedKeysMap(value) });
    }
  }
  /**
   *展开下一级面板
   * 外部设置组件的 value
   * @param item type ItemData struct {Options []*Node,Index int},带有数据选项数组与对应索引的对象
   * @param level 数据层级
   */
  expandNextActiveItem(item, level) {
    const nextActiveItems = this.state.activeItems.slice(0, level + 1);
    nextActiveItems[level + 1] = item;
    this.setState({ activeItems: nextActiveItems });
  }
  /**
   *移除最后一级面板
   */
  removeLastActiveItem() {
    const { activeItems } = this.state;
    const nextActiveItems = activeItems.slice(0, activeItems.length - 1);
    this.setState({ activeItems: nextActiveItems });
  }
  /**
   *选择
   *@param predecessors []*Node 选中的节点的前辈
   *@param item Node 选中的节点
   */
  check(predecessors, item) {
    //复制引用，方便mutable操作
    let value = this.getClonedValue(),
      //根节点，包裹在this.props.options之上一层
      first = { children: this.state.activeItems[0].options },
      //加上了根结点和自己的数组
      predecessorList = [first, ...predecessors, item],
      //开始默认为根部选中值，在迭代中每次更新为节点的父节点
      current = { children: value },
      //index，当前节点在兄弟之间的索引
      index,
      //节点兄弟
      siblings,
      //有可能自己或者后代被选中，但是之前value对应位置没有，
      //需要插入，并且插入的索引按照已经选中的兄弟在所有兄弟中前后顺序进行排序
      insertIndex,
      //兄弟索引值
      j,
      //单个兄弟
      sibling,
      //临时变量，用来保存节点，在把这个节点赋值之前可能有操作
      temp;
    //选择链路上的栈，以根结点开始
    this.checkStack = [current];
    //遍历链路
    predecessorList.slice(1).forEach((predecessor, i) => {
      //取得节点索引值
      index = current.children.findIndex(({ key }) => key === predecessor.key);
      //不存在这个节点
      if (index === -1) {
        //取得这个节点在所有选项中的兄弟
        siblings = predecessorList[i].children;
        //初始化插入的值
        insertIndex = 0;
        //遍历这些兄弟
        for (j = 0; j < siblings.length; j++) {
          sibling = siblings[j];
          //如果当前节点的（状态来自prevProps.value）的兄弟在总的siblings的时候，
          //insertIndex向后移动一位
          if (current.children.some(i => i.key === sibling.key)) {
            insertIndex++;
          }
          //直到找到了插入的位置，退出遍历
          if (sibling.key === predecessor.key) {
            break;
          }
        }
        const { children, ...rest } = predecessor;
        if (children) {
          rest.children = [];
        }
        //去除children属性，插入数组
        current.children.splice(insertIndex, 0, rest);
        //迭代current
        current = current.children[insertIndex];
        //存在这个节点
      } else {
        temp = current.children[index];
        if (!temp.children) {
          temp.children = [];
        }
        //迭代current
        current = temp;
      }
      //推入栈
      this.checkStack.push(current);
    });
    //flushCheck栈推断，只能从底向上推出一条链上所有节点的状态，并且在此过程中改变value
    flushCheck(predecessorList, this.checkStack);
    this.onChange(value);
  }
  /**
   *取消选择
   *@param predecessors []*Node 取消选中的节点的前辈
   *@param item Node 取消选中的节点
   */
  unCheck(predecessors, item) {
    //复制引用，方便mutable操作
    let value = this.getClonedValue(),
      //把自己包含进来
      predecessorList = predecessors.concat(item),
      //每次迭代节点的父节点
      current = { children: value },
      //每次迭代的节点
      predecessor,
      //迭代索引值
      i;
    //取消选择链路上的栈，以根结点开始
    this.unCheckStack = [current];
    //迭代链路
    for (i = 0; i < predecessorList.length; i++) {
      predecessor = predecessorList[i];
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
      //推入栈
      this.unCheckStack.push(current);
    }
    //flushUnCheck栈推断，只能从底向上推出一条链上所有节点的状态，并且在此过程中改变value
    flushUnCheck(predecessors, this.unCheckStack);
    this.onChange(value);
  }
  /**
   * 响应选中节点事件
   * @param item   节点数据
   * @param indexs []int 节点从根节点到自己的链路上所有前辈节点在其父节点的children中对应的索引值,
   * @param checkedType 节点当前选中类型
   */
  onItemCheck(item, indexs, checkedType) {
    //根据indexs获取到前辈节点
    let current = this.state.activeItems[0].options[indexs[0]],
      predecessors = current ? [current] : [];
    for (let i = 1; i < indexs.length; i++) {
      current = current.children[indexs[i]];
      predecessors.push(current);
    }
    //如果之前选中状态是全选，则取消选择
    if (checkedType === 2) {
      this.unCheck(predecessors, item);
    } else {
      //如果之前选中状态不是是全选（不选或者半选），则选择
      this.check(predecessors, item);
    }
  }
  /**
   * 响应点击节点事件
   * @param item  *Node  节点数据
   * @param index int 节点在其父节点中的索引值
   * @param level 节点所处数据层级
   */
  onItemClick(item, index, level) {
    const { loadData } = this.props;
    //如果是叶子节点，不做任何反应
    if (item.isLeaf) {
      return;
    }
    //如果有children，展开下一级面板
    if (item.children && item.children.length) {
      const activeItem = { options: item.children, index };
      this.expandNextActiveItem(activeItem, level);
      return;
    }
    //需要展开的面板的数据，只有索引，没有options（等请求获取之后再加上）
    //只改变options数据引用，不使用immutable数据
    const activeItem = { index };
    this.expandNextActiveItem(activeItem, level);
    //如果是异步加载选项数据，不请求数据
    if (!this.lazy) {
      return;
    }

    item.loading = true;
    //异步请求数据
    loadData(item)
      .then(options => {
        delete item.loading;
        if (Array.isArray(options) && options.length) {
          item.children = options;
          const activeItem = { options, index };
          //为展开的面板加上获取的选项
          this.expandNextActiveItem(activeItem, level);
        } else {
          //如果没有选项，设置其为叶子节点，阻止再次点击加载数据
          item.isLeaf = true;
          this.removeLastActiveItem();
        }
      })
      .catch(() => {
        //网络错误处理
        delete item.loading;
        this.removeLastActiveItem();
      });
  }
  render() {
    const { activeItems, checkKeysMap } = this.state;
    //每一个面板高亮的索引值的set
    const activeIndexs = activeItems.slice(1).map(({ index }) => index);
    //记录每一个节点从根节点到自己的链路上所有节点是否被选择的set，初始值默认为负
    const checkedArr = Array.from({ length: activeItems.length + 1 });

    return (
      <div className="cascade-multi-select">
        <div className="cascade-multi-select-sections">
          {activeItems.map(({ options }, level) => {
            if (!Array.isArray(options)) {
              return null;
            }
            //options-选项，level-层级
            return (
              <div key={level} className="cascade-multi-select-section">
                <div>
                  {options.map((item, index) => {
                    const { key, title, disabled, loading } = item,
                      checkedType = checkKeysMap[key],
                      active = index === activeIndexs[level],
                      checked = checkedType === 2 || checkedArr[level],
                      finalCheckedType = checked ? 2 : checkedType,
                      itemClassName = classnames(
                        'cascade-multi-select-section-item',
                        { active: active }
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
                    if (checked && active) {
                      checkedArr[level + 1] = true;
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
                              const indexs = activeIndexs.slice(0, level);
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
                        {loading && this.lazy && <span className="spin" />}
                        {!loading && active && <span className="caret-right" />}
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

const selectedValueType = PropTypes.arrayOf(
  PropTypes.shape({
    key: PropTypes.string,
    title: PropTypes.string,
    halfChecked: PropTypes.bool,
    children: PropTypes.arrayOf(PropTypes.shape({})),
  })
);

CascadeMultiSelect.propTypes = {
  defaultValue: selectedValueType,
  value: selectedValueType,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      title: PropTypes.string,
      children: PropTypes.arrayOf(PropTypes.shape({})),
      disabled: PropTypes.bool,
      isLeaf: PropTypes.bool,
    })
  ).isRequired,
  defaultExpandedPanels: PropTypes.arrayOf(PropTypes.number),
  onChange: PropTypes.func,
  loadData: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
};

CascadeMultiSelect.defaultProps = {
  defaultValue: [],
  defaultExpandedPanels: [0, 0],
  onChange: () => null,
  loadData: false,
};

export default CascadeMultiSelect;
