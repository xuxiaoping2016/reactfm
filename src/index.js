import React, { useState } from "react";
import ReactDOM from "react-dom";

function App() {
  let [count, setCount] = useState(6);

  return (
    <div>
      <p>you clicked {count} times</p>
      <button onClick={() => setCount(999)}>click me</button>
    </div>
  );
}


ReactDOM.render(
    <App/>,
    document.getElementById('app')
);


//https://codesandbox.io/s/km6yv14285