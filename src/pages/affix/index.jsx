import React, {Component} from 'react';
import { Affix, Button } from 'antd';
import Calculator from './Calculator'
import NameForm from './NameForm'
import styles from './index.scss'



export default class AffixCom extends React.Component {
  state = {
    top: 10,
    bottom: 10,
  }

  render() {
    return (
      <div className='affix-wrap'>
        <Affix offsetTop={this.state.top}>
          <Button
            type="primary"
            onClick={() => {
              this.setState({
                top: this.state.top + 10,
              });
            }}
          >
            Affix top
          </Button>
        </Affix>
        <br />
        <Affix offsetBottom={this.state.bottom}>
          <Button
            type="primary"
            onClick={() => {
              this.setState({
                bottom: this.state.bottom + 10,
              });
            }}
          >
            Affix bottom
          </Button>
        </Affix>
        <Calculator/>

        <NameForm/>
      </div>
    );
  }
}