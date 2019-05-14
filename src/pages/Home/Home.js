import React, { Component } from 'react';
import { take, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
// import './style.css'
import './style.scss'

import im from '../../images/wait.png'
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }

    componentDidMount(){
        // of(1,2,3)
        // .pipe(
        //     take(2),
        //     map(val => val + 2)
        // ).subscribe(console.log);
        var source = Rx.Observable.interval(1000);var click = Rx.Observable.fromEvent(document.body, 'click');var example = source.takeUntil(click);     

example.subscribe({    next: (value) => { console.log(value); },    error: (err) => { console.log('Error: ' + err); },    complete: () => { console.log('complete'); }
});
    }

    _handleClick() {
        this.setState({
            count: ++this.state.count
        });
    }

    render(){
        return (
            <div className="container">
                <p className="scss">测试scss 样式文件!!!!!!!!!!</p>
                <img src={im}/>
                this is home~~fdfkd<br/>
                当前计数：{this.state.count}<br/>
                <button onClick={() => this._handleClick()}>自增</button>
            </div>
        )
    }
}