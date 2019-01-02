import React, {Component} from 'react';

class ApiReact extends Component {
    constructor(props){
        super(props)
        this.state ={
            name:'xuxia'
        }
    }
    render() {
        
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

console.log("ApiReact",ApiReact)
console.log(<ApiReact>fdf</ApiReact>)
export default ApiReact;
