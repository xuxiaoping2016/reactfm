import React, {Component} from 'react';
import { Card } from 'antd'
import './index.scss'

import Demo1 from './commentList'
import Demo2 from './blogpost'

// import Usual from './demo2/usual'
import PropsProxyHoc from './demo2/propsProxyHoc '
import FormHoc from './demo2/formHoc'

import IiHoc from './demo2/iiHoc'
import HijackRenderHoc from './demo2/hijackRenderHoc'
import FunctionContainer from './demo2/functionContainer'

import Title from './demo3/title'
import HocRefs from './demo3/refs'
import HocInheritance from './demo3/HocInheritance'
class ContextDemo extends Component {

    render() {
        
        return (
            <div className="hoc-demo-container">
                
                {/* <Demo2 /> */}
                {/* <Usual name="xuxiao" /> */}
                {/* <Card title="props代理高阶组件">
                    <PropsProxyHoc />
                </Card>

                <Card title="表单高阶组件">
                    <FormHoc/>
                </Card>

                <Card title="表单高阶组件">
                    <IiHoc />
                </Card>

                <Card title="表单高阶组件">
                    <HijackRenderHoc />
                </Card> 
            
                <Card title="表单高阶组件">
                    <FunctionContainer />
                </Card> */}

                <Card title="">
                    <Title />
                </Card>

                <Card title="">
                    <HocRefs />
                </Card>

                <Card title="">
                    <HocInheritance />
                </Card>

                

                <div>
                    参考文档：
                    <p>
                        <a href="https://www.cnblogs.com/libin-1/p/7087605.html">React进阶之高阶组件</a>
                        <span style={{paddingLeft:"10px"}}>介绍的特别好,demo2文件夹是该文章的示例</span>
                    </p>
                    <p>
                        <a href="https://www.jianshu.com/p/0aae7d4d9bc1">深入理解 React 高阶组件</a>
                        <span style={{paddingLeft:"10px"}}>介绍的特别好,demo1文件夹是该文章的示例</span>
                    </p>
                    <p>
                        <a href="https://www.cnblogs.com/zhuanzhuanfe/p/7553522.html?utm_source=debugrun&utm_medium=referral">聊聊React高阶组件(Higher-Order Components)</a>
                    </p>
                    
                </div>
            </div>
        )
    }
}

export default ContextDemo;
