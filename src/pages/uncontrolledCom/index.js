import React, {Component} from 'react';
import Demo1 from './demo1'
import Demo2 from './demo2'

class ContextDemo extends Component {

    render() {
        
        return (
            <div>
                <div>
                    <h1 style={{color:"#f00"}}>优化性能  没有看完。。。。。。</h1>
                    <p>一、使用生产版本</p>
                    <p>二、单文件构建</p>
                </div>
                <Demo2 />
            </div>
        )
    }
}

export default ContextDemo;
