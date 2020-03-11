import React  from 'react';
import Child from './child'

export default class extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            date : new Date()
        }
    }

    componentDidMount(){
        setInterval(()=>{
            this.setState({
                date:new Date()
            })
        },1000)
    }

    render(){
        console.log("parent is rendering!")
        return (
            <div>
                <Child seconds={1} />
                <div>{this.state.date.toString()}</div>
            </div>
        )
    }
}