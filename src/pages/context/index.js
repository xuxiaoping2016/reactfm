import React, {Component} from 'react';
// import Example from './example'

import Mul from './multi/index';
import Theme from './theme'
import Theme2 from './theme2'

class ContextDemo extends Component {

    render() {
        
        return (
            <div>
                <Mul/>
                {/* <Exampl/> */}
                
                <div style={{paddingTop:"30px"}}>
                    <p>按钮主题</p>
                    <Theme/>
                </div>
                <div style={{paddingTop:"30px"}}>
                    <p>按钮主题</p>
                    <Theme2/>
                </div>
            </div>
        )
    }
}

export default ContextDemo;