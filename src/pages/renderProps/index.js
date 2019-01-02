import React, {Component} from 'react';
import MouseTracker from './mouseTracker'
import CatMouseTracker from './catMouseTracker'
import RenderProps from './renderProps'

class ContextDemo extends Component {

    render() {
        
        return (
            <div>
                <div>
                    
                </div>
                {/* <MouseTracker />
                <CatMouseTracker /> */}
                <RenderProps />
            </div>
        )
    }
}

export default ContextDemo;
