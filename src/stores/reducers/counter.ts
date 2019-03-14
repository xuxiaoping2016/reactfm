import { AnyAction } from 'redux'
import {INCREMENT, DECREMENT, RESET} from '../actions/counter';


/*
* 初始化state
 */
interface StateProps {
    count:number
}
const initState = {
    count: 0
};
/*
* reducer
 */
export default function reducer(state:StateProps = initState, action:AnyAction) :StateProps{
    switch (action.type) {
        case INCREMENT:
            return {
                count: state.count + 1
            };
        case DECREMENT:
            return {
                count: state.count - 1
            };
        case RESET:
            return {count: 0};
        default:
            return state
    }
}