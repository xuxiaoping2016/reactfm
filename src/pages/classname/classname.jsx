import React, { Component } from 'react'
import classNames from 'classnames/bind'
import './index.css'


var styles = {
    foo: 'abc',
    bar: 'def',
    baz: 'xyz'
};
var cx = classNames.bind(styles);

export default class ClassDemo extends Component {
    render(){
        return (
            <div>
                <p className={cx('foo','bar','baz')}>《傲慢与偏见》</p>
            </div>
        )
    }
}