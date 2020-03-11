

const reducers = {
    todos(state, action){
        const { type, payload } = action;
        switch(type){
            case 'set':
                return payload;
            case 'add':
                console.log('...add',payload)
                return [...state,payload];
            case 'remove':
                return state.filter( todo => {
                    return todo.id != payload;
                });
            case 'toggle':
                return state.map(todo => {
                    return todo.id === payload ? {
                        ...todo,
                        completed : !todo.completed
                    } : todo;
                });

            default:
                return state;
        }
    },
    incrementCount(state, action){
        const { type, payload } = action;
        switch(type){
            case 'set':
            case 'add':
                return state + 1;
        }
        return state;
    }
}

function conbineReducers(reducers){
    return function reducer(state,action){
        const changed = {};
        for(let key in reducers){
            changed[key] = reducers[key](state[key],action)
        }
        return {
            ...state,
            ...changed
        };
    }
}


export default conbineReducers(reducers);
