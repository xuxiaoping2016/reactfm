import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './merchantItemBig.less';
/* eslint-disable class-methods-use-this */
export default class MerchantItemBig extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    deletePid: PropTypes.number.isRequired,
    linkUrl: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    merchantName: PropTypes.string.isRequired,
    typeName: PropTypes.string,
    packAliasName: PropTypes.string.isRequired,
    validDateString: PropTypes.string.isRequired,
    showdel: PropTypes.string.isRequired,
    handleParentEditShop: PropTypes.func.isRequired,
    handleParentDelShop: PropTypes.func.isRequired,
    handleParentCloseTips: PropTypes.func.isRequired,
    errInfos: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    callbacks: PropTypes.shape({
      getEnter: PropTypes.func.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    typeName: '',
  };

  constructor(props) {
    super(props);
    this.handleEditShop = this.handleEditShop.bind(this);
    this.handleDelShop = this.handleDelShop.bind(this);
    this.closeTips = this.closeTips.bind(this);
    this.cancel = this.cancel.bind(this);
    this.handleClickShop = this.handleClickShop.bind(this);
  }

  handleEditShop(evt) {
    evt.stopPropagation();
    const { id: pid, handleParentEditShop } = this.props;
    handleParentEditShop(pid);
  }

  handleDelShop(evt) {
    evt.stopPropagation();
    const { id: pid, handleParentDelShop } = this.props;
    handleParentDelShop(pid);
  }

  closeTips(evt) {
    evt.stopPropagation();
    const { handleParentCloseTips } = this.props;
    handleParentCloseTips();
  }

  cancel(evt) {
    evt.stopPropagation();
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
      // eslint-disable-next-line no-unused-expressions,no-restricted-globals
      (window.location.href = linkUrl) && location.reload(true);
    } else {
      window.location.href = linkUrl;
    }
  }

  render() {
    const {
      logo,
      merchantName,
      typeName,
      packAliasName,
      validDateString,
      showdel,
      id: pid,
      deletePid,
      errInfos,
    } = this.props;
    return (
      <li
        className={
          deletePid !== pid ? 'merchantItemBig' : 'merchantDeleteItemBig'
        }
      >
        {deletePid !== pid ? (
          <a onClick={this.handleClickShop}>
            <div
              className="item-img"
              style={{
                backgroundImage: `url(${logo ||
                  'http://stc.weimob.cn/saas/common/images/user_header.png'})`,
              }}
            />
            <span
              className="item-name text-ellipsis ng-binding"
              title={merchantName}
            >
              {merchantName}
            </span>
            <div className="item-type text-ellipsis">
              <span className="ng-binding">{typeName}</span>
            </div>
            <div className="item-version clearfix">
              <span className="text-ellipsis ng-binding" title={packAliasName}>
                {packAliasName}
              </span>
              <span
                className={
                  validDateString === '已打烊' ? 'text-red' : 'text-ellipsis'
                }
                ng-hide="true"
                title={validDateString}
              >
                {validDateString}
              </span>
            </div>
            <div className="item-footer clearfix">
              <div
                className="item-edit stop-bubble"
                onClick={this.handleEditShop}
              >
                <span>修改</span>
              </div>
              {showdel === '1' ? (
                <div
                  className="item-del stop-bubble ng-scope"
                  onClick={this.handleDelShop}
                >
                  <span>删除</span>
                </div>
              ) : null}
            </div>
          </a>
        ) : (
          <div>
            <div
              className="tips-content del-shop-tips-new-lg"
              style={{ left: 0, top: 0 }}
              onClick={this.cancel}
            >
              <div
                className="shop-logo"
                style={{
                  backgroundImage: `url(${logo ||
                    'http://stc.weimob.cn/saas/common/images/user_header.png'})`,
                }}
              />
              <div className="shop-name">{merchantName}</div>
              <div className="tip-title">
                您的店铺不满足以下删除条件，无法操作：
              </div>
              <ul className="tips-container">
                {errInfos.map((info, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <li key={index} className="ng-binding ng-scope">
                    {info}
                  </li>
                ))}
              </ul>
            </div>
            <div className="close-tips stop-bubble" onClick={this.closeTips}>
              <i className="sfci sfci-back-shop" />
            </div>
          </div>
        )}
      </li>
    );
  }
}
