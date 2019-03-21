import React from 'react';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  
    componentDidCatch(error, info) {
      // You can also log the error to an error reporting service
    //   logErrorToMyService(error, info);
        console.log(error, info)
    }
  
    render() {
      const { render } = this.props;
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return render();
      }
  
      return this.props.children; 
    }
  }
  