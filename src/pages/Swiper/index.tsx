/*
 * @Author: xiaoping.xu
 * @Date: 2021-05-11 14:22:00
 * @LastEditors: xiaoping.xu
 * @LastEditTime: 2021-05-17 15:04:45
 * @Desc: 
 */
import React, { useState } from 'react';
// import classNames from 'classnames';
import SwipeableViews from 'react-swipeable-views';
import TabSwiper from './tabSwiper';
import ScrollerSwiper from './scroll';
import DemoAnimateHeight from './AnimateHeight';
import DemoResitance from './resistance';
import DemoNested from './nested';
import './index.scss';

const styles = {
    slide: {
      padding: 15,
      minHeight: 100,
      color: '#fff',
    },
    slide1: {
      background: '#FEA900',
    },
    slide2: {
      background: '#B3DC4A',
    },
    slide3: {
      background: '#6AC0FF',
    },
  };

const Swiper = () => {
    return (
        <div>
            {/* <div>普通</div>
            <SwipeableViews enableMouseEvents>
              <div className="slide slide1">
                slide n°1
              </div>
              <div className="slide slide2">
                slide n°2
              </div>
              <div className="slide slide3">
                slide n°3
              </div>
            </SwipeableViews>

            <div>带tab的切换</div>
            <TabSwiper/>*/}

            {/* <div>Scroller</div>
            <ScrollerSwiper /> 

            <div>AnimateHeight</div>
            <DemoAnimateHeight /> */}
            {/* <div>DemoResitance</div>
            <DemoResitance /> */}

            <div>DemoNested</div>
            <DemoNested />
        </div>
    )
}

export default Swiper;