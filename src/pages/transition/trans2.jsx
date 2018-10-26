import React from 'react';
import {  Button } from 'antd';
import { Transition } from 'react-transition-group';

export default class Example extends React.Component {
  state = {
    show: false,
    entered: false,
  };

  render() {
    const { show } = this.state;
    return (
      <div style={{ paddingTop: '2rem' }}>
        <Button
          onClick={() => {
            this.setState(state => ({
              show: !state.show,
            }));
          }}
        >
          Toggle
        </Button>
        <div style={{ marginTop: '1rem' ,background:"#0ff"}}>
          <Transition
            in={show}
            timeout={1000}
            unmountOnExit
          >
            {state => {
              switch (state) {
                case 'entering':
                  return 'Entering…';
                case 'entered':
                  return 'Entered!';
                case 'exiting':
                  return 'Exiting…';
                case 'exited':
                  return 'Exited!';
              }
            }}
          </Transition>
        </div>
      </div>
    );
  }
}
