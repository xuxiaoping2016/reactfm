import React, {Component} from 'react';
import Demo1 from './demo1'
import Demo2 from './demo2'
import Demo3 from './demo3'
import Demo4 from './demo4'
import Demo5 from './demo5'

// 源码看React---- ref  https://segmentfault.com/a/1190000011290823
// React 中的转发ref https://www.jianshu.com/p/ea89610dbbfd

class ContextDemo extends Component {

    render() {
        
        return (
            <div>
                <Demo1/>
                <p></p>
                <Demo2 />
                <Demo3 />
                <Demo4 />
                <Demo5 />
            </div>
        )
    }
}

export default ContextDemo;
