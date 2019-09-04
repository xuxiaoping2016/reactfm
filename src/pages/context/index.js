import React, {Component, Suspense} from 'react';
// import Example from './example'

import Theme from './theme'
// import Theme2 from './theme2'

let Example = React.lazy(()=>{
    return import('./example')
})
// console.log(Example)

class ContextDemo extends Component {

    render() {
        
        return (
            <div>
                <Suspense fallback={<div>Loading...</div>}>
                    <Example/>
                </Suspense>
                
                
                <div style={{paddingTop:"30px"}}>
                    <p>按钮主题</p>
                    <Theme/>
                </div>
                {/* <div style={{paddingTop:"30px"}}>
                    <p>按钮主题</p>
                    <Theme2/>
                </div> */}
            </div>
        )
    }
}

export default ContextDemo;
