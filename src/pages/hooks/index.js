import React, { useState ,Component } from 'react';
import HooksDemo1 from './demo1'
import MouseTracker from './mouseTracker'
import MouseTracker2 from './mouseTracker2'

// function Example() {
//     const [count, setCount] = useState(0);
  
//     return (
//       <div>
//         <p>You clicked {count} times</p>
//         <button onClick={() => setCount(count + 1)}>
//           Click me
//         </button>
//       </div>
//     );
//   }

//   export default Example;

 export default class HooksDemo extends Component {
    

    render(){
        return (
            <div>
                <h1>hooks!</h1>
                <HooksDemo1 render={data => <ul>
                    {data.map((val) => <li key={val.id}>{val.text}</li>)}
                </ul>}/>
                <MouseTracker/>
                <MouseTracker2/>
            </div>
        )
    }
}



/**
 * 
 * 精读《React Hooks》
https://segmentfault.com/a/1190000016979436?utm_source=tag-newest
https://juejin.im/post/5be8d3def265da611a476231

精读《怎么用 React Hooks 造轮子》
https://juejin.im/post/5bf20ce6e51d454a324dd0e6

React hooks实践
https://juejin.im/post/5c4d7122e51d4556940c15cb
 */