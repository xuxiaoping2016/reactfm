// function createThunkMiddleware(extraArgument) {
//   return ({ dispatch, getState }) => (next) => (action) => {
//     console.log('thunk middleware')
//     if (typeof action === "function") {
//       return action(dispatch, getState, extraArgument);
//     }
// 		return next(action);
// 	};
// }

function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => (next) => {
    console.log('返回 thunk')
    return (action) => {
      console.log('thunk middleware')
      if (typeof action === "function") {
        return action(dispatch, getState, extraArgument);
      }
      return next(action);
    };
  }
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;
