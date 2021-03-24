import { NAME, CHANGE } from '../actions/parent'
const intialState = {
    name:"xuxiaoping"
}

export default function reducer(state = intialState,action){
    switch(action.type){
        case NAME:
            return {
                ...state,
                ...intialState 
            };
        break;
        case CHANGE:
            return {
                ...state,
                ...action.payload
            };
        break;
        default:
            return state
    }
}