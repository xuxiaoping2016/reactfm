import React, { Component } from "react";
import { Table, Button } from "antd";


const renderContent = (value, row, index) => {
    const obj = {
      children: value,
      props: {},
    };
    if (index === 4) {
      obj.props.colSpan = 0;
    }
    return obj;
  };
  
  const columns = [{
    title: 'Name',
    dataIndex: 'name',
    width:"15%",
    render: (text, row, index) => {
      if (index < 4) {
        return <a href="javascript:;">{text}</a>;
      }
      return {
        children: <a href="javascript:;">{text}</a>,
        props: {
          colSpan: 5,
        },
      };
    },
  }, {
    title: 'Age',
    dataIndex: 'age',
    width:"15%",
    render: renderContent,
  }, {
    title: 'Home phone',
    colSpan: 2,
    width:"20%",
    dataIndex: 'tel',
    render: (value, row, index) => {
      const obj = {
        children: value,
        props: {},
      };
      if(index === 1) {
        obj.props.colSpan = 2;
      }
      if (index === 2) {
        obj.props.rowSpan = 2;
      }
      // These two are merged into above cell
      if (index === 3) {
        obj.props.rowSpan = 0;
      }
      if (index === 4) {
        obj.props.colSpan = 0;
      }
      return obj;
    },
  }, {
    title: 'Phone',
    colSpan: 0,
    dataIndex: 'phone',
    width:"20%",
    render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        };
        if(index === 1) {
          obj.props.colSpan = 0;
        }
        if (index === 4) {
            obj.props.colSpan = 0;
        }
        return obj;
    },
  }, {
    title: 'Address',
    dataIndex: 'address',
    width:"30%",
    render: renderContent
  }];
  
  const data = [{
    key: '1',
    name: 'John Brown',
    age: 32,
    tel: '0571-22098909',
    phone: 18889898989,
    address: 'New York No. 1 Lake Park',
  }, {
    key: '2',
    name: 'Jim Green',
    tel: '0571-22098333',
    phone: 18889898888,
    age: 42,
    address: 'London No. 1 Lake Park',
  }, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'Sidney No. 1 Lake Park',
  }, {
    key: '4',
    name: 'Jim Red',
    age: 18,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'London No. 2 Lake Park',
  }, {
    key: '5',
    name: 'Jake White',
    age: 18,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'Dublin No. 2 Lake Park',
  }];
export default class CellMerge extends Component {
    
  render() {
    return (
        <div>
            <Table
                columns={columns}
                dataSource={data}
                bordered
                scroll={{ y: 240 }}
            />
        </div>
    );
  }
}
