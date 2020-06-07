import React, { Component } from 'react';
import PT from 'prop-types';
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;
let startDate;
export default class LimitedRangePicker extends Component {
  static propTypes = {
    rangeDays: PT.number,
  };

  static defaultProps = {
    rangeDays: 7,
  };

  calendarChange = dates => {
    if (dates.length === 1) {
      startDate = dates[0];
    } else {
      startDate = null;
    }
  };

  // 保证选定起始日期后，只能选择某段时间内作为结束日期
  disabledDate = date => {
    if (startDate) {
      const { rangeDays } = this.props;
      return (
        date.diff(startDate, 'days') > rangeDays ||
        startDate.diff(date, 'days') > rangeDays
      );
    }
    return false;
  };

  render() {
    const {
      placeholder = ['开始时间', '结束时间'],
      rangeDays,
      ...props
    } = this.props;
    return (
      <RangePicker
        onCalendarChange={date => this.calendarChange(date)}
        placeholder={placeholder}
        disabledDate={this.disabledDate}
        {...props}
      />
    );
  }
}

/**
 * 限制时间跨度的时间段选择（
 * @property {number} rangeDays 可选 默认值7  可以选择的时间段最大跨度，单位（天）
 */
