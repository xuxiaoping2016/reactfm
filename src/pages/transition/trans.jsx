import React, {Component} from 'react';
import { Transition} from 'react-transition-group';
import './trans.less'


const duration = 1000;

const defaultStyle = {
  transition: `color ${duration}ms ease-in-out`,
  color: "#f00"
}

const transitionStyles = {
  entering: { color: "#f00" },
  entered:  { color: "#00f" },
};

const Fade = ({ in: inProp }) => (
  <Transition in={inProp} timeout={duration}>
    {(state) => (
      <div style={{
        ...defaultStyle,
        ...transitionStyles[state]
      }}>
        I'm a fade Transition!
      </div>
    )}
  </Transition>
);

export default Fade