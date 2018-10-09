import React, {Component} from 'react';
import Todo from '../../component/todolists/index'

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state ={
            count:0
        }
    }

    handleClick = () =>{
        this.setState({
            count: ++this.state.count
        });
    }
    render() {
        return (
            <div>
                this is home~558888888888888888888<br/>
                当前计数：{this.state.count}<br/>
                <button onClick={ this.handleClick}>自增</button>
                <Todo/>
            </div>
        )
    }
}