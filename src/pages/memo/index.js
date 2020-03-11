import React from 'react'

import Parent from './parent'
import Parent1 from './parent1'
import fibonacci from './fibonacci'
class MemoDemo extends React.Component {
  render() {
    // console.log(fibonacci(10))
    return (
      <div>
          {/* <Parent /> */}
          <br/>
          <Parent1 />
      </div>
    ); 
  }
}






export default MemoDemo;