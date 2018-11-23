import React, { Component } from "react";
import { Table, Divider, Tag } from "antd";

const { Column, ColumnGroup } = Table;

const data = [
  {
    key: "11",
    firstName: "John",
    lastName: "Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"]
  },
  {
    key: "22",
    firstName: "Jim",
    lastName: "Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"]
  },
  {
    key: "33",
    firstName: "Joe",
    lastName: "Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"]
  }
];

const rowSelection = {
    // columnTitle:"自定义",
    // columnWidth:"100px",
    // fixed:true,
    hideDefaultSelections:true,
    // selectedRowKeys:["33"],
    // selection:{
        // key:"firstName",
        // text:'',
        // onSelect:function(param1,param2){
        //     console.log('...........',param1,param2)
        // }
    // },
    onChange: (selectedRowKeys, selectedRows) => {
    // selectedRowKeys 被选中项的key值列表数组  selectedRows 被选中的项数组
    console.log(selectedRowKeys)
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => {
        console.log(record);
        return {
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
          }
        }
  };

export default class Table1 extends Component {
  render() {
    return (
      <Table dataSource={data} rowSelection={rowSelection}>
        <ColumnGroup title="Name">
          <Column title="First Name" dataIndex="firstName" key="firstName" />
          <Column title="Last Name" dataIndex="lastName" key="lastName" />
        </ColumnGroup>
        <Column title="Age" dataIndex="age" key="age" />
        <Column title="Address" dataIndex="address" key="address" />
        <Column title="tag1" dataIndex="tags[0]" key="tags[0]" />
        <Column title="tag2" dataIndex="tags[1]" key="tags[1]" />
        {/* <Column
          title="Tags"
          dataIndex="tags"
          key="tags"
          render={tags => (
            <span>
              {tags.map(tag => (
                <Tag color="blue" key={tag}>
                  {tag}
                </Tag>
              ))}
            </span>
          )}
        /> */}
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <span>
              <a href="javascript:;">Invite {record.lastName}</a>
              <Divider type="vertical" />
              <a href="javascript:;">Delete</a>
            </span>
          )}
        />
      </Table>
    );
  }
}
