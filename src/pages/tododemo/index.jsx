import React, {Component} from 'react';
import TodoList from './TodoList';
import AddTodo from './AddTodo';

export default class TodoView extends Component{
    componentDidMount(){
        const arr = {
            fdf:function(){
                console.log('55')
            }
        }
    }
    render(){
        return(
            <div className='todoView'>
                <AddTodo />
                <TodoList />
            </div>
        )
    }
}