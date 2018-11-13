import React, {Component} from 'react';
import GoodsList from '../../components/GoodsList/index'

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state ={
            data:{}
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
                <GoodsList/>
            </div>
        )
    }
}