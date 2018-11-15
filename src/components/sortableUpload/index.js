/*eslint-disable*/
import React from 'react';
import classnames from 'classnames';
import { Upload } from 'antd';
import CardList from './cardList';
import styles from './index.module.less';

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
        const { showUploadList, listType, onPreview } = this.props;
        const { showRemoveIcon, showPreviewIcon } = showUploadList;
        return (
            <CardList
                listType={listType}
                items={this.state.fileList}
                onPreview={onPreview}
                onRemove={this.handleManualRemove}
                showRemoveIcon={showRemoveIcon}
                showPreviewIcon={showPreviewIcon}
                moveCard={this.moveCard}
                locale={{ ...locale, ...this.props.locale }}
            />
        );
    };
}

export default props => {
    const { className, ...restProps } = props;
    return (
        <div className={classnames(styles.sortable_upload, className)}>
            <SortableUpload {...restProps} />
        </div>
    );
};
