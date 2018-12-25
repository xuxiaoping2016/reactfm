import React from 'react';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';
import { isEqual } from 'lodash';
import classNames from 'classnames';
import Trigger from 'rc-trigger';
import { Input } from 'antd';
import style from './index.module.less';
/* eslint-disable no-param-reassign */
const findTarget = (arr, value, layer) => {
  if (!layer) {
    return arr.map(p => ({
      label: p.label,
      value: p.value,
    }));
  }
  if (!value || (value && value.slice(0, layer).some(p => !p))) {
    return [];
  }
  return (
    value.slice(0, layer).reduce((prev, cur) => {
      prev = prev.find(p => `${p.value}` === `${cur}`).children;
      return prev;
    }, arr) || []
  );
};

const toText = (arr, array) => {
  if (arr && array.length) {
    const match = [];
    arr.reduce((prev, cur) => {
      if (cur) {
        prev = prev.find(p => `${p.value}` === `${cur}`);
        match.push(prev.label);
        prev = prev.children;
      }
      return prev;
    }, array);
    return match.join('/');
  }
  return '';
};

class WeimobCascader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value, activeIndex: 0 }; // eslint-disable-line
  }

  componentDidMount() {
    const { activeIndex } = this.state;
    this.handleTabClick(activeIndex);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!isEqual(nextProps.value, prevState.value)) {
      return { value: nextProps.value };
    }
    return null;
  }

  filter = memoize((options, value, activeIndex) =>
    findTarget(options, value, activeIndex)
  );

  handleTabClick = layer => {
    this.setState({
      activeIndex: layer,
    });
  };

  handleItemClick = val => {
    const { onChange = () => {}, tabs } = this.props;
    const { activeIndex, value } = this.state;
    let newValue = value;
    if (!value) {
      newValue = [val];
    } else {
      newValue = newValue.slice(0, activeIndex);
      newValue.push(val);
    }
    onChange(newValue);
    if (activeIndex + 1 < tabs.length) {
      this.setState({ value: newValue, activeIndex: activeIndex + 1 }, () =>
        this.handleTabClick(activeIndex + 1)
      );
    } else {
      this.setState({ value: newValue, visible: false });
    }
  };

  handlePopupVisibleChange = visible => {
    this.setState({ visible });
  };

  render() {
    const { value, activeIndex, visible } = this.state;
    const { tabs, options, placeholder } = this.props;
    const items = this.filter(options, value, activeIndex);
    /* eslint-disable react/no-array-index-key */
    const popup = (
      <div className={style.cascader}>
        <div className={style.tabs}>
          {tabs.map((p, idx) => (
            <span
              key={idx}
              className={classNames(style.tab, {
                [style.activeTab]: idx === activeIndex,
              })}
              onClick={() => this.handleTabClick(idx)}
            >
              {p}
            </span>
          ))}
        </div>
        <div className={style.content}>
          {items.map(item => (
            <div className={style.wrapper} key={item.value}>
              <span
                className={classNames(style.item, {
                  [style.activeItem]:
                    value && item.value === value[activeIndex],
                })}
                onClick={() => this.handleItemClick(item.value)}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    );

    return (
      <Trigger
        action={['click']}
        popup={popup}
        popupAlign={{
          points: ['tl', 'bl'],
          offset: [-180, -150],
        }}
        maskClosable
        mask
        destroyPopupOnHide
        onPopupVisibleChange={this.handlePopupVisibleChange}
        popupVisible={visible}
        zIndex={1050}
        className={style.triger}
      >
        <div className={style.inputWrapper}>
          <Input
            className={style.input}
            value={toText(value, options)}
            placeholder={placeholder}
            maxLength="20"
            readOnly
          />
          <i className={style.arrow} />
        </div>
      </Trigger>
    );
  }
}

export default WeimobCascader;

WeimobCascader.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.number.isRequired,
      ]),
      label: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  tabs: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};

WeimobCascader.defaultProps = {
  onChange: () => {},
  placeholder: '',
};
