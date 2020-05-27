function createLogMiddleware() {
    return (obj) => (next) => (action) => {
        // 这里可以做一些事情；
        return next(action);
      };
  }
  
  const logs = createLogMiddleware();
  logs.withExtraArgument = createLogMiddleware;
  
  export default logs;
  