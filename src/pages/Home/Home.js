import React, { Component } from 'react';
import XLSX from 'xlsx'

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        }
    }

    componentDidMount(){
        const reader = new FileReader();
        reader.onload= function(res){
            console.log(res)
        }
        
        reader.readAsDataURL()
    }
    
    onReadImg(e) {
        console.log(e.target.files[0]);
        const reader = new FileReader();
        // 读取文件内容，结果用data:url的字符串形式表示
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = function(e) {
            console.log(e.target.result);  // 上传的图片的编码
            this.setState({
                previewPic: e.target.result
            });
        }.bind(this);
    }

    render(){
        return (
            <div className="container">
                <input type="file" ref="file"/>
                <button onClick={this.onReadImg}>读取图片</button>
            </div>
        )
    }
}