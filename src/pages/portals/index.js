import React, {Component} from 'react';
// import Parent from './demo1'
import Dialog from './portal2'

class ContextDemo extends Component {

    render() {
        
        return (
            <div>
                <div>
                    <h1 style={{color:"#f00"}}>优化性能  没有看完。。。。。。</h1>
                    <p>一、使用生产版本</p>

                    <p>参考文档：
                        <a href="https://zhuanlan.zhihu.com/p/29880992?utm_source=wechat_session&utm_medium=social&from=singlemessage">传送门：React Portal</a>

                    </p>
                    <div id='portal'></div>
                    <div id="modal"></div>
                </div>
                <Dialog>
                    <div 
                    style={{width:"300px",padding:"20px",background:"#fff"}}
                    >
                        <header>portal dialog</header>
                        <div>
                            neirongqu
                        </div>
                    </div>
                </Dialog>
                {/* <Parent /> */}
            </div>
        )
    }
}

export default ContextDemo;
