import React from 'react';
import { Input, InputNumber } from 'antd';
import PropTypes from 'prop-types';
import {
  MIN_MONEY,
  MAX_MONEY,
  MONEY_PRECISION,
} from '../../../utils/constants';

const InputGroup = Input.Group;

export default class InputNumberRange extends React.Component {
  static propTypes = {
    value: PropTypes.arrayOf(PropTypes.number).isRequired,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    onChange: args => args,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      value: [preMinValue, preMaxValue],
    } = prevState;
    const {
      value: [nextMinValue, nextMaxValue],
    } = nextProps;
    if (nextMinValue !== preMinValue || nextMaxValue !== preMaxValue) {
      return {
        value: [nextMinValue, nextMaxValue],
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      value: props.value || [0, 0],
    };
    ['handleChangeMinValue', 'handleChangeMaxValue'].forEach(fnName => {
      this[fnName] = this[fnName].bind(this);
    });
  }

  handleChangeMinValue(nextMinValue) {
    const { onChange } = this.props;
    const { value } = this.state;
    onChange([nextMinValue, value[1]]);
  }

  handleChangeMaxValue(nextMaxValue) {
    const { onChange } = this.props;
    const { value } = this.state;
    onChange([value[0], nextMaxValue]);
  }

  render() {
    const {
      value: [minValue, maxValue],
    } = this.state;
    return (
      <div>
        <InputGroup compact>
          <InputNumber
            style={{ width: 70, textAlign: 'center' }}
            placeholder="Minimum"
            min={MIN_MONEY}
            max={MAX_MONEY}
            precision={MONEY_PRECISION}
            value={minValue}
            onChange={this.handleChangeMinValue}
          />

          <InputNumber
            style={{
              width: 20,
              borderLeft: 0,
              pointerEvents: 'none',
              backgroundColor: '#fff',
              textAlign: 'center',
            }}
            placeholder="~"
            disabled
          />

          <InputNumber
            style={{ width: 70, textAlign: 'center', borderLeft: 0 }}
            placeholder="Maximum"
            min={MIN_MONEY}
            max={MAX_MONEY}
            precision={MONEY_PRECISION}
            value={maxValue}
            onChange={this.handleChangeMaxValue}
          />
        </InputGroup>
      </div>
    );
  }
}
