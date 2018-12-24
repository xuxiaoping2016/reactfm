import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Table, Popconfirm } from 'antd';

@inject('todoStore')
@observer
export default class TodoList extends Component{
    componentDidMount(){
        const { todoStore } = this.props;
        todoStore.fetchTodos();
    }
    render(){
        const { todoStore } = this.props;
        const columns = [{
            title: 'todo',
            dataIndex: 'todo',
        },{
            title: 'action',
            dataIndex: 'action',
            width: 100,
            render:  (text, record) => {
                return(
                    <Popconfirm title="确认删除?" onConfirm={() => todoStore.remove(record.key)}>
                        <a>删除</a>
                    </Popconfirm>
                )
            }
        }];
        const rowSelection = {
            selectedRowKeys: todoStore.selectedRowKeys,
            onChange: todoStore.onSelectChange,
        };
        return(
            <div>
                <Table
                    dataSource={todoStore.todos.toJS()}
                    columns={columns}
                    rowSelection={rowSelection}
                    loading={todoStore.loading}
                    pagination={false}
                    size='middle'
                />
                <p style={{marginTop:'15px'}}>{`Total ${todoStore.total} items`}</p>
            </div>
        )
    }
}