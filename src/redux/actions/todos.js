export function createSet(payload){
    return {
        type:'set',
        payload
    }
}

let idSeq = Date.now();

export function createAdd(text){
    // 异步action在发起的时候state已经定型不可变了
    // 当发起异步后，快速删除同名称的todo，发起的异步还是加不进来
    return (dispatch, getState) => {
        setTimeout(() => {
            // const { todos } = state;
            const { todos } = getState();
            const bBtn = !todos.find(todo => todo.text === text);
            console.log('bBtn',bBtn);
            if(bBtn){
                dispatch({
                    type:'add',
                    payload:{
                        id: ++idSeq,
                        text: text,
                        completed: false
                    }
                })
            }
        }, 1000);
    }
    // return {
    //     type:'add',
    //     payload
    // }
}


export function createRemove(payload){
    return {
        type:'remove',
        payload
    }
}


export function createToggle(payload){
    return {
        type:'toggle',
        payload
    }
}