import history from 'utils/history'
import React, { Component } from 'react';
import { Prompt } from 'react-router-dom'
import His from './com'


export default class Page1 extends Component {
    constructor(props){
        super(props)
        this.state = {
            tit :"我是page1"
        }
    }
    componentDidMount(){
        // console.log(history)
        // console.log(this.props)
    }
    componentDidUpdate(prevProps){
        const locationChanged = this.props.location !== prevProps.location;

        // console.log(this.props.location,prevProps.location)
        // console.log(this.props.history.location,prevProps.history.location)
        // INCORRECT, will *always* be false because history is mutable.
        const locationChanged2 =
        this.props.history.location !== prevProps.history.location;
        // console.log(locationChanged,locationChanged2)
    }

    resetTit = () => {
        this.setState({tit:"更改后的标题"})
        history.push("/page1/3")
        // console.log(history)
    }
    render(){
        const { params } = this.props.match;
        const { tit } = this.state;
        return (
            <div>
                this is page1!! buchong <br/>
                param 参数：{ params.id}<br/>
                页面标题 : { tit }  <button onClick={this.resetTit}>更改标题</button>
                <His/>
                <Prompt message={location => {
                    console.log(location)
                    return `Are you sue you want to go to ${location.pathname}?`
                }} />
            </div>
        )
    }
}