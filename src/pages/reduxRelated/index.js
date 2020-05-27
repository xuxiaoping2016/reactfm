import React, { Component } from 'react';
import { connect } from 'react-redux';

class ReduxRelated extends Component {

    render(){
        console.log(this.props);
        return (
            <div>
                <p>用来测试connect</p>
                <p>也可用来测试嵌套路由</p>
            </div>
        )
    }
}

export default connect()(ReduxRelated);