import React, { Component } from 'react';
import { Input } from 'antd'

export default class FileReader extends Component {
    constructor(props) {
        super(props);
        this.state = {
           img:''
        }
    }

    onImageChange = (e) =>{
        const file = e.target.files[0];

        const reader = new FileReader();
        reader.onload= (res) => {
            console.log(res)
            this.setState({img:res.target.result})
        }
        
        reader.readAsDataURL(file)
    }

    render(){
        const { img } = this.state;

        return (
            <div className="container">
                {img ? <img src={img} style={{width:"100px",height:"100px"}}/> : null}
                <Input type="file"
                    onChange={ e => this.onImageChange(e)}
                    style={{width:"230px",display:"inline-block",marginRight:"10px"}}/>
            </div>
        )
    }
}