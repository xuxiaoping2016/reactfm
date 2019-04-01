import React from 'react';

const FancyButton = React.forwardRef(({label, handle, ...props}, ref) => (
    <button ref={ref} onClick={handle} className="FancyButton" {...props}>
        {props.children || label}
    </button>
));

function logProps(WrappedComponent) {
    class LogProps extends React.Component {
      componentDidUpdate(prevProps) {
        console.log('old props:', prevProps);
        console.log('new props:', this.props);
      }
  
      render() {
          console.log("logProps", this.props)
          const { forwardref ,...props} = this.props;
        return <WrappedComponent ref={forwardref} {...props} />;
      }
    }
  
    return LogProps;
}

export default logProps(FancyButton)