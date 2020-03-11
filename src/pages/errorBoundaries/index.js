import React, {Component} from 'react';
import Example from './example'
import Errors from './Error'
class ContextDemo extends Component {

    render() {
        
        return (
            <div>
                <Errors />
                <Example/>
            </div>
        )
    }
}

export default ContextDemo;
