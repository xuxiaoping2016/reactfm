import React, { Component } from 'react';
import Wrapper from '../../../component/wrapper/index'
import css from './styles.less'

export default class Demo2 extends Component {
    state = {
        disabled: true,
    }
    onChange = (e) => {
        const length = e.target.value.length;
        if (length >= 4) {
            this.setState(() => ({ disabled: false }))
        } else if (!this.state.disabled) {
            this.setState(() => ({ disabled: true }))
        }
    }
    render() {
        const label = this.state.disabled ? 'Disabled' : 'Submit';
        return (
            <div className="App">

                <Wrapper>
                    获得焦点改变input长度<br />
                    <input type="text" className="input" />
                </Wrapper>

                <Wrapper>
                    input框输入满足条件时 按钮可点击<br/>
                    <button
                        style={Object.assign({}, styles.button, !this.state.disabled && styles.buttonEnabled)}
                        disabled={this.state.disabled}
                    >{label}</button>
                    <br />
                    <input
                        style={styles.input}
                        onChange={this.onChange}
                    />
                </Wrapper>
            </div>
        );
    }
}

const styles = {
    input: {
        width: 200,
        outline: 'none',
        fontSize: 20,
        padding: 10,
        border: 'none',
        backgroundColor: '#ddd',
        marginTop: 10,
    },
    button: {
        width: 180,
        height: 50,
        border: 'none',
        borderRadius: 4,
        fontSize: 20,
        cursor: 'pointer',
        transition: '.25s all',
    },
    buttonEnabled: {
        backgroundColor: '#ffc107',
        width: 220,
    }
}