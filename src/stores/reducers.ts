import {AnyAction} from 'redux'
import counter from './reducers/counter';
import {enthusiasm} from './reducers/index'


interface StateProps {
    [propName: string]: any;
}
export default function combineReducers(state : StateProps = {}, action:AnyAction):StateProps {
    return {
        counter: counter(state.counter, action),
        demo: enthusiasm(state.demo, action)
    }
}