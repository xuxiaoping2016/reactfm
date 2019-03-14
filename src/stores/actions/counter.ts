import { AnyAction } from 'redux'
export const INCREMENT : string = "counter/INCREMENT";
export const DECREMENT : string = "counter/DECREMENT";
export const RESET : string = "counter/RESET";


export function increment() : AnyAction {
    return {type: INCREMENT}
}

export function decrement() : AnyAction {
    return {type: DECREMENT}
}

export function reset() : AnyAction {
    return {type: RESET}
}