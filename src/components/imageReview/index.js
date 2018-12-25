import React from 'react';
import { Icon } from 'antd';
import Modal from 'components/uiKits/modal';
import PropTypes from 'prop-types';
import styles from './index.module.less';

export default class ImageReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      index: 0,
    };
  }

  static propTypes = {
    data: PropTypes.arrayOf(Object).isRequired,
  };

  showModal = (item, index) => {
    this.setState({
      index,
      previewVisible: true,
    });
  };

  hideModal = item => {
    this.setState({
      previewVisible: false,
    });
  };

  slideImg = slideToLeft => {
    const { index } = this.state;
    const iNow = slideToLeft ? index - 1 : index + 1;
    this.setState({
      index: iNow,
    });
  };

  render() {
    const { previewVisible, index } = this.state;
    const { data } = this.props;
    const len = data.length;

    return (
      <div className={styles['image-review']}>
        <ul>
          {data.map((item, index) => (
            <li key={index} onClick={this.showModal.bind(this, item, index)}>
              <div className={styles.review}>查看</div>
              <img src={item} alt="凭证" />
            </li>
          ))}
        </ul>
        <Modal
          visible={previewVisible}
          useCustomFooter
          centered
          onCancel={this.hideModal}
          width={700}
          wrapClassName={styles['image-review-modal']}
        >
          <div
            onClick={this.slideImg.bind(this, true)}
            className={`${styles['btn-left']} ${index === 0 && styles.hidden}`}
          >
            <Icon type="left" theme="outlined" />
          </div>

          <img alt="example" style={{ width: '100%' }} src={data[index]} />
          <div
            onClick={this.slideImg.bind(this, false)}
            className={`${styles['btn-right']} ${index === len - 1 &&
              styles.hidden}`}
          >
            <Icon type="right" theme="outlined" />
          </div>
        </Modal>
      </div>
    );
  }
}
