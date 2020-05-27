import { INCREMENT, DECREMENT, RESET } from "../actions/counter";

/*
 * 初始化state
 */

const initState = {
  count: 0,
};
/*
 * reducer
 */
export default function reducer(state = initState, action) {
  switch (action.type) {
    case INCREMENT:
      console.log(state);
      return {
        count: state.count + 2,
      };
    case DECREMENT:
      return {
        count: state.count - 2,
      };
    case RESET:
      return { count: 0 };
    default:
      return state;
  }
}
