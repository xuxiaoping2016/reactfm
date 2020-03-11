import React, {Component} from 'react';
import NameForm from './nameForm'
import TextareaForm from './textarea'
import SelectForm from './select'
import FileInput from './fileInput'

class ContextDemo extends Component {

    render() {
        
        return (
            <div>
                <div style={{marginBottom:"20px"}}>
                    <NameForm />
                </div>

                <TextareaForm/>

                <SelectForm/>
                
                <FileInput/>
            </div>
        )
    }
}

export default ContextDemo;
