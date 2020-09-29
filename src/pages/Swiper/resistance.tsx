import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import './index.scss';

function DemoResitance() {
  return (
    <SwipeableViews resistance enableMouseEvents>
        <div className="slide slide1">slide n°1</div>
        <div className="slide slide2">slide n°2</div>
        <div className="slide slide3">slide n°3</div>
    </SwipeableViews>
  );
}

export default DemoResitance;