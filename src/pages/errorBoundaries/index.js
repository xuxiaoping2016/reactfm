import React, {Component} from 'react';
import Example from './example'
import Errors from './Error'

import Theme from './theme'
import Theme2 from './theme2'

class ContextDemo extends Component {

    render() {
        
        return (
            <div>
                <Errors />
                {/* <Example/> */}
            </div>
        )
    }
}

export default ContextDemo;
