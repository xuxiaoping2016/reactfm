import React, { memo, useEffect, useState, useRef, useCallback } from 'react';
import { createSet, createAdd, createRemove, createToggle} from 'store/actions/todos'
import { List } from 'antd';
import './todo.css'
import { domainToASCII } from 'url';
import { func } from 'prop-types';

let idSeq = Date.now();
let LS_KEY = "$_todos";

function bindActionCreators(actionCreators, dispatch){
    const ret = {};
    for(let key in actionCreators){
        ret[key] = function(...args){
            const actionCreator = actionCreators[key];
            const action = actionCreator(...args)
            dispatch(action)
        }
    }
    return ret;
}
const Control = memo(function Control(props){
    const { addTodo } = props;
    const inputRef = useRef();
    const onSubmit = (e) => {
        e.preventDefault();
        const newText = inputRef.current.value;
        if(newText.length === 0){
            return ;
        }
        addTodo({
            id: ++idSeq,
            text: newText,
            completed: false
        });
        inputRef.current.value = '';
    }
    return (
        <div className ="control">
            <h1>todos</h1>
            <form onSubmit={onSubmit}>
                <input ref={inputRef} type="text" className="new-todo" placeholder="what needs to be done?" />
            </form>
        </div>
    )
});

const TodoItem =  memo(function TodoItem(props){
    const { todo:{
        id,text, completed
    }, removeTodo, toggleTodo} = props
    const onChange = () => {
        toggleTodo(id);
    }
    const onRemove = () => {
        removeTodo(id)
    }
    return (
        <li className="todo-item">
            <input type="checkbox" onChange={onChange} checked={completed}/>
            <label className={completed ? 'completed' :''}>{text}</label>
            <button type="button" onClick={onRemove}>&#xd7;</button>
        </li>
    )
});

const Todos = (function Todos(props){
    const { todos, removeTodo, toggleTodo} = props;
    return (
        <ul className="todos">
            {
                todos.map((todo,index) => <TodoItem key={index} todo={todo} removeTodo={removeTodo} toggleTodo={toggleTodo}></TodoItem>)
            }
        </ul>
    )
});


// function Control(){
//     return <div></div>
// }
function TodoList(){
    
    const  [todos, setTodos] = useState([]);

    const dispatch = useCallback(action => {
        const { type, payload } = action;
        switch(type){
            case 'set':
                setTodos(payload);
                break;
            case 'add':
                setTodos(todos => [...todos,payload]);
                break;
            case 'remove':
                setTodos(todos => todos.filter( todo => {
                    return todo.id != payload;
                }));
                break;
            case 'toggle':
                setTodos(todos => todos.map(todo => {
                    return todo.id === payload ? {
                        ...todo,
                        completed : !todo.completed
                    } : todo;
                }));
                break;
            default: 
        }
    },[]);

    useEffect(() => {
        const todos = JSON.parse(localStorage.getItem(LS_KEY) || [])
        dispatch(createSet(todos));
    },[])

    useEffect(() => {
        localStorage.setItem(LS_KEY,JSON.stringify(todos))
    },[todos])
    
    return (<div className="todo-list">
        <Control
        {
           ...bindActionCreators({
            addTodo : createAdd
           },dispatch) 
        }/>
        <Todos todos={todos} 
        {
            ...bindActionCreators({
             removeTodo : createRemove,
             toggleTodo : createToggle
            },dispatch) 
        }
        />
    </div>)
}

export default TodoList;