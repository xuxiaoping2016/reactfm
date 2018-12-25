import React, { Component } from 'react';
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;
let startDate;
let that;

export default class LimitedRangePicker extends Component {
  state = {
    rangeDays: 7, // eslint-disable-line react/no-unused-state
  };

  static getDerivedStateFromProps(nextProps) {
    const { days = 7 } = nextProps;
    return {
      rangeDays: days,
    };
  }

  calendarChange(dates) {
    if (dates.length === 1) {
      startDate = dates[0];
    } else {
      startDate = null;
    }
  }

  disabledDate(date) {
    if (startDate) {
      const { rangeDays } = that.state;
      return (
        date.diff(startDate, 'days') > rangeDays ||
        startDate.diff(date, 'days') > rangeDays
      ); // 保证选定起始日期后，只能选择某段时间内作为结束日期
    }
    return false;
  }

  render() {
    that = this;
    const { placeholder = ['开始时间', '结束时间'], ...props } = this.props;
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
