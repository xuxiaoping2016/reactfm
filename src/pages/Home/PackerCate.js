import React from 'react';
import { DatePicker } from 'antd';

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

function onChange(value, dateString) {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
}
  
function onOk(value,dateString) {
    console.log('onOk: ', value, dateString);
}

const PickerCate = () => {
    return (
        <div>
            <div style={{'padding':"20px"}}>
                DatePicker : <DatePicker onChange={onChange} showTime onOk={onOk}/>
            </div>
            <div style={{'padding':"20px"}}>
                MonthPicker: <MonthPicker onChange={onChange} placeholder="Select month" />
            </div>
            <div style={{'padding':"20px"}}>
                RangePicker: <RangePicker onChange={onChange} />
            </div>
            <div style={{'padding':"20px"}}>
                WeekPicker: <WeekPicker onChange={onChange} placeholder="Select week" />
            </div>
        </div>
    )
};

export default PickerCate;