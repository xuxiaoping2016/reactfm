import React, {Component} from 'react';
import NameForm from './nameForm'
import FileInput from './fileInput'

class ContextDemo extends Component {

    render() {
        
        return (
            <div>
                <div style={{marginBottom:"20px"}}>
                    <NameForm />
                </div>
                
                <FileInput/>
            </div>
        )
    }
}

export default ContextDemo;
