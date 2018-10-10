import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Table, Popconfirm } from 'antd';

@inject('storebox')
@observer
export default class TodoList extends Component{
    componentDidMount(){
        const { storebox } = this.props;
        storebox.fetchTodos();
    }
    render(){
        const { storebox } = this.props;
        const columns = [{
            title: 'todo',
            dataIndex: 'todo',
        },{
            title: 'action',
            dataIndex: 'action',
            width: 100,
            render:  (text, record) => {
                return(
                    <Popconfirm title="确认删除?" onConfirm={() => storebox.remove(record.key)}>
                        <a>删除</a>
                    </Popconfirm>
                )
            }
        }];
        const rowSelection = {
            selectedRowKeys: storebox.selectedRowKeys,
            onChange: storebox.onSelectChange,
        };
        return(
            <div>
                <Table
                    dataSource={storebox.todos.toJS()}
                    columns={columns}
                    rowSelection={rowSelection}
                    loading={storebox.loading}
                    pagination={false}
                    size='middle'
                />
                <p style={{marginTop:'15px'}}>{`Total ${storebox.total} items`}</p>
            </div>
        )
    }
}