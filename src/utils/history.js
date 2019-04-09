import { createBrowserHistory } from 'history';

const history = createBrowserHistory({
  // basename: '/supplier/183/78',
  getUserConfirmation(message, callback) {
    //    console.log("getUserConfirmation", message,callback)
    return callback(window.confirm(message));
  },
});

// console.log(history)

export default history;
