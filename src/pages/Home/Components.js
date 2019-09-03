import React, {Component} from 'react';

export default class Co extends Component {
    render(){
        return (
            <div>
                {React.Children.map(this.props.children,(item) =>{
                    return (<div>{item}</div>)
                })}
            </div>
        )
    }
}