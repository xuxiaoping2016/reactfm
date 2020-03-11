import React, { memo, useEffect, useState, useRef, useCallback } from 'react';
import { List } from 'antd';
import './todo.css'
import { domainToASCII } from 'url';


let idSeq = (new Date()).getTime();
let LS_KEY = "$_todos";
const Control = memo(function Control(props){
    const { dispatch } = props;
    const inputRef = useRef();
    const onSubmit = (e) => {
        e.preventDefault();
        const newText = inputRef.current.value;
        if(newText.length === 0){
            return ;
        }
        dispatch({
            type:'add',
            payload: {
                id: (new Date()).getTime(),
                text: newText,
                completed: false
            }
        })
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
    }, dispatch} = props
    const onChange = () => {
        dispatch({
            type:'toggle',
            payload:id
        })
    }
    const onRemove = () => {
        dispatch({
            type:'remove',
            payload:id
        })
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
    const { todos, dispatch} = props
    return (
        <ul className="todos">
            {
                todos.map((todo,index) => <TodoItem key={index} todo={todo} dispatch={dispatch}></TodoItem>)
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
                setTodos(todos => [...todos,todo]);
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
        dispatch({
            type:'set',
            payload:todos
        });
    },[])

    useEffect(() => {
        localStorage.setItem(LS_KEY,JSON.stringify(todos))
    },[todos])
    
    return (<div className="todo-list">
        <Control dispatch={dispatch}/>
        <Todos todos={todos} dispatch={dispatch}/>
    </div>)
}

export default TodoList;