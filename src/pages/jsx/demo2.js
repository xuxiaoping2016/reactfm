import React, { Component} from 'react';

// function FancyButton(props) {
//   return (
//     <button className="FancyButton">
//       {props.children}
//     </button>
//   );
// }

const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// You can now get a ref directly to the DOM button:
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;


function App() {
  return (
    <div>
      regs
    </div>
  );
}

export default App;