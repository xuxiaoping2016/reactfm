import React, { useState } from 'react';
import classNames from 'classnames';
import SwipeableViews from 'react-swipeable-views';
import './index.scss';


const slideContainer:{
    height: number;
    WebkitOverflowScrolling: "touch" | "inherit" | "-moz-initial" | "initial" | "revert" | "unset" | "auto" | undefined
} = {
      height: 100,
      WebkitOverflowScrolling: "touch", // iOS momentum scrolling '"touch" | "inherit" | "-moz-initial" | "initial" | "revert" | "unset" | "auto" | undefined'
    }

const list:any[] = [];

for (let i = 0; i < 30; i += 1) {
  list.push(<div key={i}>{`item n°${i + 1}`}</div>);
}
const ScrollerSwiper = () => {
    return (
        <SwipeableViews containerStyle={slideContainer} enableMouseEvents>
            <div className="slide slide1">{list}</div>
            <div className="slide slide2">slide n°2</div>
            <div className="slide slide3">slide n°3</div>
        </SwipeableViews>
    )
}

export default ScrollerSwiper;