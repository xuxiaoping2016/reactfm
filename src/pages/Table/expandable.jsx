import React, { Component } from "react";
import { Table, Button } from "antd";


const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    { title: 'Action', dataIndex: '', key: 'x', render: () => <a href="javascript:;">Delete</a> },
];

const data = [
    { key: 11, name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park', description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.' },
    { key: 22, name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park', description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.' },
    { key: 33, name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park', description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.' },
];

export default class Expandable extends Component {
    state = {
        expandedRowKeys : [11]
    }

    expandedRowRender = (record, index, indent, expanded) => {
        // console.log(record, index, indent, expanded)
        return <p style={{ margin: 0 }}>{record.description}</p>
    }

    onExpand = (expanded, record) => {
        // expanded 当前行是否展开 
        // record 当前行数据
        console.log('onExpand',expanded, record)
    }

    onExpandedRowsChange = (expandedRowKeys) => {
        // expandedRowKeys   当前选中的数据行的key[]
        this.setState({expandedRowKeys})
        console.log("onExpandedRowsChange", expandedRowKeys)
    }

    onClick = () => {
        console.log(this.state.expandedRowKeys)
    }
  render() {
      const { expandedRowKeys } = this.state;
    return (
        <div>
            <Button onClick={this.onClick}>选中项</Button>
            <Table
                columns={columns}
                expandRowByClick
                expandedRowRender={this.expandedRowRender}
                onExpand={this.onExpand}
                onExpandedRowsChange={this.onExpandedRowsChange}
                // expandedRowKeys={expandedRowKeys}
                defaultExpandedRowKeys={expandedRowKeys}
                // defaultExpandAllRows={true}
                dataSource={data}
            />
        </div>
    );
  }
}
