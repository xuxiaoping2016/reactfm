import React, { Component } from 'react';
import { Input } from 'antd'

export default class FileReaderDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
           img:''
        }
    }

    onImageChange = (e) => {
        const file = e.target.files[0];

        const reader = new FileReader();
        reader.onload= (res) => {
            console.log(res)
            this.setState({img:res.target.result})
        }
        reader.readAsDataURL(file)

        /*
            FileReader共有4种读取方法：
            1.readAsArrayBuffer(file)：将文件读取为ArrayBuffer。
            2.readAsBinaryString(file)：将文件读取为二进制字符串
            3.readAsDataURL(file)：将文件读取为Data URL
            4.readAsText(file, [encoding])：将文件读取为文本，encoding缺省值为'UTF-8'
                         */
    }

    render(){
        const { img } = this.state;

        return (
            <div className="container">
                {img ? <img src={img} style={{width:"100px",height:"100px"}}/> : null}
                <Input type="file"
                    onChange={this.onImageChange}
                    style={{width:"230px",display:"inline-block",marginRight:"10px"}}/>
            </div>
        )
    }
}