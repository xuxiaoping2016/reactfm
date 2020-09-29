import React, { useState } from 'react';
import classNames from 'classnames';
import SwipeableViews from 'react-swipeable-views';
import './index.scss';

const Swiper = () => {
    const [current,setCurrent] = useState(0);
    const handleTabChange = (index:number) => {
        console.log(index)
        setCurrent(index)
    }
    return (
        <div>
            <ul className='tabs'>
                <li className={classNames('tab',current== 0 ? 'active':'')} onClick={() => handleTabChange(0)}>tab1</li>
                <li className={classNames('tab',current== 1 ? 'active':'')} onClick={() => handleTabChange(1)}>tab2</li>
                <li className={classNames('tab',current== 2 ? 'active':'')} onClick={() => handleTabChange(2)}>tab3</li>
            </ul>
            <SwipeableViews index={current} onChangeIndex={handleTabChange}>
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
        </div>
    )
}

export default Swiper;