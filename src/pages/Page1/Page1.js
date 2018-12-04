import React, { Component } from 'react';
import { Modal, Button } from 'antd'

export default class Page1 extends Component {
    onSure = () => {
        Modal.confirm({
            title: '是否确认已经收到买家寄回的商品？',
            okButtonProps: {
              loading: true,
            },
            onOk: () => {}
        })
    }
    render(){
        return (
            <div>
                <p>this is page1!! buchong</p>
                <Button onClick={this.onSure}>确认</Button>
            </div>
        )
    }
}