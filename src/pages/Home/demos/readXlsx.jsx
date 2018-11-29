import React, { Component } from 'react';
import XLSX from 'xlsx'
import { Input, Table } from 'antd'

const { Column } = Table;



export default class FileReaderDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
           list:[]
        }
    }

    fixdata= data => { //文件流转BinaryString
        var o = "",
            l = 0,
            w = 10240;
        for(; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
        return o;
    }

    onImageChange = e => {
        const file = e.target.files[0];

        const reader = new FileReader();
        reader.onload= (res) => {
            console.log(res)
            const data = res.target.result;
            const wb = XLSX.read(btoa(this.fixdata(data)), {//手动转化
                type: 'base64'
            });
            console.log(XLSX)
            console.log(wb)
            const ret = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
            this.setState({list : ret})
        }
        reader.readAsArrayBuffer(file)
    }

    render(){
        const { list } = this.state;
        console.log(list)
        return (
            <div className="container">
                <Input type="file"
                    onChange={this.onImageChange}
                    style={{width:"230px",display:"inline-block",marginRight:"10px"}}/>
                
                <Table dataSource={list} rowKey="__rowNum__">
                    <Column title="ID" dataIndex="__rowNum__" />
                    <Column title="订单编号" dataIndex="订单编号"/>
                    <Column title="物流单号" dataIndex="物流单号"/>
                </Table>
            </div>
        )
    }
}