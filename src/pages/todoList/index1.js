import React, { memo, useEffect, useState, useRef, useCallback } from 'react';
import { List } from 'antd';
import './todo.css'
import { domainToASCII } from 'url';


let idSeq = (new Date()).getTime();
let LS_KEY = "$_todos";
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
            id: (new Date()).getTime(),
            text: newText,
            completed: false
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
    }, toggleTodo, removeTodo} = props
    const onChange = () => {
        toggleTodo(id)
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
    const { todos, toggleTodo, removeTodo} = props
    return (
        <ul className="todos">
            {
                todos.map((todo,index) => <TodoItem key={index} todo={todo} toggleTodo={toggleTodo} removeTodo={removeTodo}></TodoItem>)
            }
        </ul>
    )
});


// function Control(){
//     return <div></div>
// }
function TodoList(){
    
    const  [todos, setTodos] = useState([]);

    useEffect(() => {
        const todos = JSON.parse(localStorage.getItem(LS_KEY) || [])
        setTodos(todos);
    },[])

    useEffect(() => {
        localStorage.setItem(LS_KEY,JSON.stringify(todos))
    },[todos])

    const addTodo = useCallback((todo) => {
        setTodos(todos => [...todos,todo])
    },[])

    // const removeTodo = (id) => {
    //     setTodos(todos => todos.filter( todo => {
    //         return todo.id != id;
    //     }))
    // }
    const removeTodo = useCallback((id) => {
        setTodos(todos => todos.filter( todo => {
            return todo.id != id;
        }))
    },[])

    const toggleTodo = useCallback((id) => {
        // setTodos(todos => todos.map(todo => todo.completed = !todo.completed))
        setTodos(todos => todos.map(todo => {
            return todo.id === id ? {
                ...todo,
                completed : !todo.completed
            } : todo;
        }))
    },[])

    
    return (<div className="todo-list">
        <Control addTodo={addTodo}/>
        <Todos todos={todos} removeTodo={removeTodo} toggleTodo={toggleTodo}/>
    </div>)
}

export default TodoList;