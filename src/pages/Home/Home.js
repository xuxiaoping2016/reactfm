import React, { Component } from 'react';





const validateFormat = function(format) {
    if (format === undefined) {
    throw new Error('invariant requires an error message argument');
    }
}
  
function invariant(condition, format, a, b, c, d, e, f) {
    validateFormat(format);
  
    if (!condition) {
      let error;
      if (format === undefined) {
        error = new Error(
          'Minified exception occurred; use the non-minified dev environment ' +
            'for the full error message and additional helpful warnings.',
        );
      } else {
        const args = [a, b, c, d, e, f];
        console.log(args)
        let argIndex = 0;
        error = new Error(
          format.replace(/%s/g, function() {
            return args[argIndex++];
          }),
        );
        error.name = 'Invariant Violation';
      }
  
      error.framesToPop = 1; // we don't care about invariant's own frame
      console.log(error)
      throw error;
    }
  }

export default class Home extends Component {
    componentDidMount(){
        invariant(false,'hello %s word %s %s %s %s 我的 %s','1','2','3','4','5','6')
    }

    render(){
        return (
            <div>
                <h1>Welcome!</h1>
            </div>
        )
    }
}