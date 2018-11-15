import React, { Component } from 'react';
import { message as AntMessage } from 'antd';
import SortableUpload from '../sortableUpload';
import { uploadImg } from '../../services/xinyun';
import './index.less';

class Uploader extends Component {
  constructor(props) {
    super(props);
    this.bindMethods();
  }

  bindMethods() {
    const methods = ['onFileListSortChange', 'beforeUpload', 'customRequest'];
    methods.forEach(methodName => {
      this[methodName] = this[methodName].bind(this);
    });
  }

  onFileListSortChange(fileList) {
    this.props.onChangeFile({ fileList });
  }

  beforeUpload(file) {
    const { size } = file;
    const { maxSize = 1, onError } = this.props;
    if (size > maxSize * 1024 * 1024) {
      onError(`文件大于${maxSize}M,请重新选择文件`);
      return false;
    }
    return true;
  }

  customRequest({ file }) {
    const { pid, fileList = [], onChangeFile, onError } = this.props;
    const formData = new FormData();
    formData.append('multipartFile', file);

    uploadImg(pid, formData)
      .then(res => {
        const originFile = {
          url: res.data.url,
          uid: res.data.mediaId,
          sort: fileList.length + 1,
          type: 1,
          status: 'done',
        };
        const nextFileList = [...fileList, { ...originFile }];
        // 禁止上传重复图片
        const isNoSome = fileList.every(file => {
          if (file.uid) {
            return file.uid !== originFile.uid; // 全都不一样
          }
          return true;
        });
        if (isNoSome) {
          onChangeFile({ file: originFile, fileList: nextFileList });
        } else {
          AntMessage.error('重复上传');
        }
      })
      .catch(reason => {
        onError(reason);
      });
  }

  render() {
    const { children, ...rest } = this.props;
    return (
      <SortableUpload
        onFileListSortChange={this.onFileListSortChange}
        beforeUpload={this.beforeUpload}
        customRequest={this.customRequest}
        {...rest}
      >
        {children}
      </SortableUpload>
    );
  }
}

export default Uploader;
