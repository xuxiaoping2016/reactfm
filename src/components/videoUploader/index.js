import React, { Component } from 'react';
import { Upload as AntdUpload } from 'antd';
import { uploadVideo } from '../../services/xinyun';

class VideoUploader extends Component {
  handleSubmit = ({ file, onSuccess, onProgress }) => {
    const { onError, maxSize = 1, pid } = this.props;
    // const progress = (p) => {
    //   return (done) => {
    //     onProgress({
    //       percent: p * 100
    //     });
    //     done();
    //   };
    // };
    // const nameTuple = file.name.split('.');
    // const extension = nameTuple[nameTuple.length - 1];
    if (file.size >= maxSize * 1024 * 1024) {
      onError(`文件大于${maxSize}M,请重新选择文件`);
      return;
    }

    const formData = new FormData();
    formData.append('multipartFile', file);

    uploadVideo(pid, formData)
      .then(res => {
        onSuccess({ ...res, originName: file.name }, file);
      })
      .catch(reason => {
        onError(reason);
      });
    return false;
  };

  render() {
    const { children, secret, onError, maxSize = 1, pid, ...rest } = this.props;
    return (
      <AntdUpload accept="video/*" customRequest={this.handleSubmit} {...rest}>
        {children}
      </AntdUpload>
    );
  }
}

export default VideoUploader;
