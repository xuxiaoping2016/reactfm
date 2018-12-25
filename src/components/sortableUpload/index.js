import React from 'react';
import classNames from 'classnames';
import { Upload } from 'antd';
import CardList from './cardList';
import styles from './index.module.less';

/* eslint-disable react/no-this-in-sfc */
class SortableUpload extends Upload {
  moveCard = (dragIndex, hoverIndex) => {
    const { fileList } = this.state;
    const nextFileList = fileList.slice(0);
    const dragItem = nextFileList[dragIndex];
    nextFileList[dragIndex] = nextFileList[hoverIndex];
    nextFileList[hoverIndex] = dragItem;
    this.props.onFileListSortChange(nextFileList, fileList);
  };

  renderUploadList = locale => {
    const {
      showUploadList,
      listType,
      onPreview,
      locale: propsLocale,
    } = this.props;
    const { showRemoveIcon, showPreviewIcon } = showUploadList;
    const { fileList } = this.state;
    return (
      <CardList
        listType={listType}
        items={fileList}
        onPreview={onPreview}
        onRemove={this.handleManualRemove}
        showRemoveIcon={showRemoveIcon}
        showPreviewIcon={showPreviewIcon}
        moveCard={this.moveCard}
        locale={{ ...locale, ...propsLocale }}
      />
    );
  };
}

export default props => {
  const { className, ...restProps } = props;
  return (
    <div className={classNames(styles.sortable_upload, className)}>
      <SortableUpload {...restProps} />
    </div>
  );
};
