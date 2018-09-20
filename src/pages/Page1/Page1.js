import React, {Component} from 'react';
import './Page1.css';

import image from './images/1.png';

export default class Page1 extends Component {
    render() {
        return (
            <div  className="page-box">
                this is Page1~___刷新测试！
                <div>fdfdsklfjdkshufdsioiooifdf</div>
                <img src={image}/>
            </div>
        )
    }
}