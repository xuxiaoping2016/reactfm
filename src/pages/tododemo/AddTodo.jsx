import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Input, Popconfirm } from 'antd';
import '../../styles/todo.less';

@inject('storebox')
@observer
export default class AddTodo extends Component{
    render(){
        const { storebox } = this.props;
        return (
            <div>
                <Input
                    placeholder="添加todolist"
                    onChange={(e) => storebox.newtodo = e.target.value}
                    defaultValue={storebox.newtodo}
                    style={{width:'200px'}}
                />
                <Button type="primary" onClick={storebox.AddTodo} className='btn'>添加</Button>
                <Popconfirm title="确认删除?" onConfirm={() => storebox.removeSelected()}>
                    <Button type="danger" className='btn'>删除选中</Button>
                </Popconfirm>
            </div>
        )
    }
}