import React from 'react';

export default class Child extends React.PureComponent {
    render(){
        console.log('Child is rendering');
        return (
            <div>I am update every {this.props.seconds} seconds</div>
        )
    }
}