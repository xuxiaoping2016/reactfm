function createLogMiddleware() {
    return (obj) => (next) => (action) => {
        console.log('log middleware')
        // 这里可以做一些事情；
        return next(action);
      };
  }
  
  function createLogMiddleware() {
    return (obj) => (next) => {
        console.log('返回 log')
        return (action) => {
            console.log('log middleware')
            // 这里可以做一些事情；
            return next(action);
          };
    }
  }

  const logs = createLogMiddleware();
  logs.withExtraArgument = createLogMiddleware;
  
  export default logs;
  