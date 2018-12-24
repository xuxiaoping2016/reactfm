import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Input, Popconfirm } from 'antd';
import '../../styles/todo.less';

@inject('todoStore')
@observer
export default class AddTodo extends Component{
    render(){
        const { todoStore } = this.props;
        return (
            <div>
                <Input
                    placeholder="添加todolist"
                    onChange={(e) => todoStore.newtodo = e.target.value}
                    defaultValue={todoStore.newtodo}
                    style={{width:'200px'}}
                />
                <Button type="primary" onClick={todoStore.AddTodo} className='btn'>添加</Button>
                <Popconfirm title="确认删除?" onConfirm={() => todoStore.removeSelected()}>
                    <Button type="danger" className='btn'>删除选中</Button>
                </Popconfirm>
            </div>
        )
    }
}