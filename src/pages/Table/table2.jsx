import React, { Component } from "react";
import { Table } from "antd";

const columns = [{
    title: 'Name',
    dataIndex: 'name',
  }, {
    title: 'Age',
    dataIndex: 'age',
  }, {
    title: 'Address',
    dataIndex: 'address',
  }];
  
  const data = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`,
    });
  }
  

export default class Table1 extends Component {

    state = {
        selectedRowKeys: [1], // Check here to configure the default column
    }

    // selectedRowKeys 当前可选的数据项的key 列表 数组
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }
    // record 当前操作行的数据
    // selected 是否选中 Boolean
    // selectedRows  选中项数据列表[]
    // nativeEvent  原生事件对象
    toSelect = (record, selected, selectedRows, nativeEvent) => {
        console.log("toSelect",record, selected, selectedRows, nativeEvent)
    }
// selected 是否全选？
// selectedRows  选中项数据列表[]
// changeRows 此次被选中的数据项列表[]
    toSelectAll = (selected, selectedRows, changeRows) => {
        console.log("toSelectAll",selected, selectedRows, changeRows)
    }
// selectedRows 当前可选的数据项的key 列表 数组
    toSelectInvert = (selectedRows,a,b) => {
        console.log("toSelectInvert",selectedRows,a,b)
    }

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      onSelect:this.toSelect,
      onSelectAll:this.toSelectAll,
      onSelectInvert:this.toSelectInvert,
    //   hideDefaultSelections: true,
      selections: [{
        key: 'all-data',
        text: 'Select All Data',
        onSelect: () => {
          this.setState({
            selectedRowKeys: [...Array(46).keys()], // 0...45
          });
        },
      }, {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          this.setState({ selectedRowKeys: newSelectedRowKeys });
        },
      }, {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          this.setState({ selectedRowKeys: newSelectedRowKeys });
        },
      }]
    };
    return (
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    );
  }
}
