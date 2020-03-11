import React, { memo, useEffect, useState, useRef, useCallback } from 'react';
import { createSet, createAdd, createRemove, createToggle} from 'store/actions/todos'
import { List } from 'antd';
import './todo.css'
import { domainToASCII } from 'url';
import { func } from 'prop-types';

let idSeq = Date.now();
let LS_KEY = "$_todos";

function reducer(state, action){
    const { type, payload } = action;
    const { todos ,incrementCount } = state;
    switch(type){
        case 'set':
            return {
                ...state,
                todos: payload,
                incrementCount: incrementCount+1
            };
        case 'add':
            return {
                ...state,
                todos:[...todos,payload],
                incrementCount: incrementCount+1
            };
        case 'remove':
            return {
                ...state,
                todos:todos => todos.filter( todo => {
                    return todo.id != payload;
                })
            };
        case 'toggle':
            return {
                ...state,
                todos: todos.map(todo => {
                    return todo.id === payload ? {
                        ...todo,
                        completed : !todo.completed
                    } : todo;
                })
            };

        default:
            return state;
    }
}

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
    const [ incrementCount, setIncrementCount] = useState(0)

    const dispatch = useCallback(action => {
        const state = {
            todos,
            incrementCount
        }

        const setters = {
            todos: setTodos,
            incrementCount: setIncrementCount
        }
        const newState = reducer(state, action);
        for(let key in newState){
            setters[key](newState[key])
        }
    },[todos, incrementCount]);

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