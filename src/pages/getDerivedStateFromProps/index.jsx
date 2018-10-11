import React, {Component} from 'react';
import { Form, Icon, Input, Button } from 'antd';

class EmailInput extends Component {
    state = { email: this.props.email };

    render() {
        return <input onChange={this.handleChange} value={this.state.email} />;
    }

    handleChange = event => {
        this.setState({ email: event.target.value });
    };

    componentWillReceiveProps(nextProps) {
        // This will erase any local state updates!
        // Do not do this.
        this.setState({ email: nextProps.email });
    }
}

export default class DrivedState extends Component {
    state = {
        email:"xxp@sina.cn"
    }
    render(){
        const {email} = this.state;
        // return <EmailInput email={email}/>
        return <div>sfdf</div>
    }
}