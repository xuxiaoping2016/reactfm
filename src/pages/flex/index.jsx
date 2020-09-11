import React, { Component } from 'react';
import moment from 'moment';
import style from './index.less'
const d = 1599717499000;
const m = moment(d).format('YYYY-MM-DD HH:mm:ss');
console.log('..',m)

export default class NotFound extends Component {
    render(){
        return (
            <div>
                <div className="title">flex布局</div>
                <div className="wrapper">
                    <div className="dis_flex">
                        <div className="flex1">...</div>
                        <div className="flex1">...</div>
                    </div>
                    <div className="dis_flex">
                        <div className="flex1">...</div>
                        <div className="flex1">...</div>
                        <div className="flex1">...</div>
                    </div>
                    <div className="dis_flex">
                        <div className="flex1">...</div>
                        <div className="flex1">...</div>
                        <div className="flex1">...</div>
                        <div className="flex1">...</div>
                    </div>
                </div>
                <div className="title">百分比布局</div>
                <div className="wrapper">
                    <div className="dis_flex">
                        <div className="u-1of2 common">1/2</div>
                        <div className="flex1">auto</div>
                        <div className="flex1">auto</div>
                    </div>
                    <div className="dis_flex">
                        <div className="flex1">auto</div>
                        <div className="u-1of3 common">1/3</div>
                    </div>
                    <div className="dis_flex">
                        <div className="u-1of4 common">1/4</div>
                        <div className="flex1">auto</div>
                        <div className="u-1of3 common">1/3</div>
                    </div>
                </div>


                <div className="title">圣杯布局</div>
                <div className="shengbei">
                    <header>#header</header>
                    <div className="HolyGrail-body">
                        <nav className="HolyGrail-nav">nav</nav>
                        <main className="HolyGrail-content">content<br/>content<br/>content<br/>content<br/>content<br/>content<br/></main>
                        <aside className="HolyGrail-ads">aside</aside>
                    </div>
                    <footer>#footer</footer>
                </div>
            </div>
        )
    }
}