import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './merchantItemSmall.less';
/* eslint-disable class-methods-use-this,no-restricted-globals,no-unused-expressions */
export default class MerchantItemSmall extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    deletePid: PropTypes.number.isRequired,
    linkUrl: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    merchantName: PropTypes.string.isRequired,
    showdel: PropTypes.string.isRequired,
    handleParentEditShop: PropTypes.func.isRequired,
    handleParentDelShop: PropTypes.func.isRequired,
    handleParentCloseTips: PropTypes.func.isRequired,
    callbacks: PropTypes.shape({
      getEnter: PropTypes.func.isRequired,
    }).isRequired,
    index: PropTypes.number.isRequired,
    errInfos: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.handleEditShop = this.handleEditShop.bind(this);
    this.handleDelShop = this.handleDelShop.bind(this);
    this.cancel = this.cancel.bind(this);
    this.handleClickShop = this.handleClickShop.bind(this);
    this.closeTips = this.closeTips.bind(this);
  }

  handleEditShop(evt) {
    evt.stopPropagation();
    const { id: pid, handleParentEditShop, handleParentCloseTips } = this.props;
    handleParentCloseTips();
    handleParentEditShop(pid);
  }

  handleDelShop(evt) {
    evt.stopPropagation();
    const { id: pid, handleParentDelShop, handleParentCloseTips } = this.props;
    handleParentCloseTips();
    handleParentDelShop(pid);
  }

  cancel(evt) {
    evt.stopPropagation();
  }

  closeTips(evt) {
    evt.stopPropagation();
    const { handleParentCloseTips } = this.props;
    handleParentCloseTips();
  }

  async handleClickShop() {
    const { linkUrl } = this.props;
    const url = document.createElement('a');
    url.href = linkUrl;
    const { id: pid } = this.props;
    const {
      callbacks: { getEnter },
    } = this.props;
    await getEnter(pid);
    const { hostname } = window.location;
    if (hostname === url.hostname) {
      (window.location.href = linkUrl) && location.reload(true);
    } else {
      window.location.href = linkUrl;
    }
  }

  render() {
    const {
      logo,
      merchantName,
      showdel,
      id: pid,
      deletePid,
      index,
      errInfos,
    } = this.props;
    return (
      <div style={{ position: 'relative' }}>
        <li className="merchantItemSmall">
          <a onClick={this.handleClickShop} className="item-content">
            <div className="shop-logo-container">
              <div
                className="item-img"
                style={{
                  backgroundImage: `url(${logo ||
                    'http://stc.weimob.cn/saas/common/images/user_header.png'})`,
                }}
              />
              <div className="logo-mark" />
            </div>
            <div className="item-footer">
              <div className="item-name text-ellipsis ng-binding">
                {merchantName}
              </div>
              <div className="item-operate">
                <span
                  className="edit-btn stop-bubble"
                  onClick={this.handleEditShop}
                >
                  修改
                </span>
                {showdel === '1' ? (
                  <span
                    className="del-btn stop-bubble ng-scope"
                    onClick={this.handleDelShop}
                  >
                    删除
                  </span>
                ) : null}
              </div>
            </div>
          </a>
        </li>
        {pid === deletePid ? (
          <div
            className={classNames(
              'tips-content',
              'del-shop-tips-new-sm',
              index % 6 > 3 ? 'del-shop-tips-right' : 'del-shop-tips-left'
            )}
            onClick={this.cancel}
          >
            <div className="tip-title">
              您的店铺不满足以下删除条件，无法操作：
            </div>
            <ul className="tips-container">
              {errInfos.map((info, idx) => (
                // eslint-disable-next-line react/no-array-index-key
                <li key={idx} className="ng-binding ng-scope">
                  {info}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    );
  }
}
