import React, { Component } from 'react';
import { Upload, message, Button, Icon } from 'antd';

export default class UploadDemo extends Component {
    constructor(props) {
        super(props);
        
    }

    static defaultProps = {
        name: 'file',
        action: '//jsonplaceholder.typicode.com/posts/',
        headers: {
          authorization: 'authorization-text'
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        }
    }

    componentDidMount(){
        
    }

    render(){
        return (
            <div style={{width:'600px'}}>
                <Upload {...this.props}>
                    <Button>
                        <Icon type="upload" /> Click to Upload
                    </Button>
                </Upload>
                {/* <Alert message="Warning text"  banner/>
                <br />
                <Alert message="Very long warning text warning text text text text text text text"  closable />
                <br />
                <Alert showIcon={false} message="Warning text without icon"  />
                <br />
                <Alert type="error" message="Error text" /> */}


            </div>
        )
    }
}