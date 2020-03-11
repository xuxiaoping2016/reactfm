import React  from 'react';
import Child from './child1'

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
        console.log("parent1 is rendering!")
        return (
            <div>
                <Child seconds={1} callback={() => {}}/>
                <div>{this.state.date.toString()}</div>
            </div>
        )
    }
}