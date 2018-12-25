import React, { Component } from 'react';
import { Input, message as AntMessage } from 'antd';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import DotPoint from 'utils/dot';
import style from './merchantListModal.module.less';
import CommonModal from './commonModal';
import Loading from '../components/loading';
import imgUrl from '../assets/img/search-empty.png';

import MerchantItemBig from '../components/merchant/merchantItemBig';
import MerchantItemSmall from '../components/merchant/merchantItemSmall';
import MerchantEdit from '../components/merchant/merchantEdit';
import MerchantDelete from '../components/merchant/merchantDelete';

export default class MerchantListModal extends Component {
  static propTypes = {
    merchantListModalVisible: PropTypes.bool.isRequired,
    onHideMerchantListModal: PropTypes.func.isRequired,
    callbacks: PropTypes.shape({
      validCanDropMerchant: PropTypes.func.isRequired,
      getCode: PropTypes.func.isRequired,
      dropMerchant: PropTypes.func.isRequired,
      getEnterWithType: PropTypes.func.isRequired,
    }).isRequired,
    // 存放 pid, storeId, wid
    SystemStore: PropTypes.shape({
      pid: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      storeId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
      wid: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    }).isRequired,
    XinyunStore: PropTypes.shape({
      merchantsList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
      getMerchantList: PropTypes.func.isRequired,
      updateMessage: PropTypes.func.isRequired,
      getMsgCount: PropTypes.number.isRequired,
      message: PropTypes.shape([]).isRequired,
      getMerchantListByName: PropTypes.func.isRequired,
      merchantName: PropTypes.string.isRequired,
    }).isRequired,
    urls: PropTypes.shape({}).isRequired,
    utils: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      isShowSearch: false, // 是否显示搜索框
      listType: 0, // 0，大图标，1小图标
      inputValue: '', // 输入值
      searchValue: '', // 搜索值
      isShowItem: 0, // 0代表店铺，1修改，2删除，3空白页，4完善店铺信息
      currentPage: 1, // 本地分页
      pageSize: 3,
      switching: 0, // 切换动画 -1 向左，0 无， 1向右
      operatingPid: 1, // 点击所在店铺的pid
      errInfos: [], // 不能删除店铺原因
      deletePid: 1, // 区分修改和删除pid
      loading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeListType = this.handleChangeListType.bind(this);
    this.handleSearchMerchant = this.handleSearchMerchant.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleClearAll = this.handleClearAll.bind(this);
    this.handleScrollPrev = this.handleScrollPrev.bind(this);
    this.handleScrollNext = this.handleScrollNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleEditShop = this.handleEditShop.bind(this);
    this.handleValidCanDelShop = this.handleValidCanDelShop.bind(this);
    this.handleSendCode = this.handleSendCode.bind(this);
    this.handleSubmitDeleteShop = this.handleSubmitDeleteShop.bind(this);
    this.handleSubmitEditShop = this.handleSubmitEditShop.bind(this);
    this.handleSetSearch = this.handleSetSearch.bind(this);
    this.handleFirstEditShop = this.handleFirstEditShop.bind(this);
    this.getListByName = this.getListByName.bind(this);
  }

  componentDidMount() {}

  async getListByName(name) {
    const { pid, storeId } = this.props.SystemStore;
    const { getMerchantListByName } = this.props.XinyunStore;
    const options = {
      pid,
      storeId,
      name,
    };
    await getMerchantListByName(options);
  }

  handleChange() {
    const { isShowSearch } = this.state;
    this.setState({
      isShowSearch: !isShowSearch,
    });
  }

  handleSetSearch() {
    this.setState({
      isShowSearch: true,
      listType: 0,
      isShowItem: 0,
      inputValue: '',
      searchValue: '',
      currentPage: 1,
    });
    this.getListByName('');
  }

  handleFirstEditShop() {
    const { pid } = this.props.SystemStore;
    this.setState({
      isShowItem: 4, // 完善店铺信息
      operatingPid: pid,
    });
    DotPoint.dot({
      pagename: 'wm_fillinfo',
      elementid: 'pv',
      eventtype: 'view',
    });
  }

  handleChangeListType() {
    this.setState({ listType: this.state.listType === 0 ? 1 : 0 });
  }

  async handleSearchMerchant(evt) {
    const searchValue = evt.target.value;
    this.setState({
      inputValue: searchValue,
      searchValue,
      loading: true,
    });
    await this.getListByName(searchValue);
    this.setState({ loading: false, currentPage: 1 });
    const { merchantsList } = this.props.XinyunStore;
    if (merchantsList && merchantsList.length === 0) {
      this.setState({
        isShowItem: 3,
      });
    } else {
      this.setState({
        isShowItem: 0,
      });
    }
  }

  handleChangeName(evt) {
    this.setState({ inputValue: evt.target.value });
  }

  async handleClearAll() {
    const name = '';
    this.setState({
      inputValue: '',
      searchValue: '',
      loading: true,
      isShowItem: 0,
      currentPage: 1,
    });
    await this.getListByName(name);
    this.setState({ loading: false });
  }

  handleScrollPrev() {
    const { currentPage } = this.state;
    const that = this;
    if (currentPage > 1) {
      that.setState({ currentPage: currentPage - 1, switching: -1 });
      setTimeout(() => {
        that.setState({ switching: 0 });
      }, 500);
    }
  }

  handleScrollNext() {
    const { merchantsList } = this.props.XinyunStore;
    const { currentPage, pageSize } = this.state;
    const that = this;
    if ((currentPage - 1) * pageSize < merchantsList.length) {
      that.setState({ currentPage: currentPage + 1, switching: 1 });
      setTimeout(() => {
        that.setState({ switching: 0 });
      }, 500);
    }
  }

  async handleBack() {
    // 返回第一页并重新拉取列表
    this.setState({ isShowItem: 0, currentPage: 1 });
    const { searchValue } = this.state;
    await this.getListByName(searchValue);
  }

  handleEditShop(operatingPid) {
    this.setState({ isShowItem: 1, operatingPid });
  }

  async handleValidCanDelShop(operatingPid) {
    const {
      callbacks: { validCanDropMerchant },
    } = this.props;
    const resp = await validCanDropMerchant(operatingPid);
    if (resp.data.canDrop) {
      this.setState({
        operatingPid,
        isShowItem: 2,
      });
    } else {
      this.setState({
        operatingPid,
        deletePid: operatingPid,
        errInfos: resp.data.errInfos,
      });
    }
  }

  async handleSendCode() {
    const {
      XinyunStore: { info },
      callbacks: { getCode },
    } = this.props;
    const options = {
      phone: info.phone,
      zone: info.zone,
      codeTo: 'delect',
    };
    await getCode(options);
  }

  async handleSubmitDeleteShop(values) {
    const { operatingPid } = this.state;
    const {
      callbacks: { dropMerchant },
      SystemStore: { wid, pid },
      XinyunStore: { info, merchantsList },
    } = this.props;
    const options = {
      ...values,
      wid,
      pid: operatingPid,
      zone: info.zone,
      codeTo: 'delect',
    };

    const resp = await dropMerchant(options);
    if (resp.errcode === 0) {
      AntMessage.success('删除成功');
      if (Number(operatingPid) === Number(pid)) {
        const { urls } = this.props;
        if (merchantsList.length === 1) {
          // 删除仅有的一个店铺
          window.location.href = `${urls.originDOMAIN}/#/app/solution/list`;
        } else {
          window.location.href = `${urls.originDOMAIN}/#/app/error/notshop`;
        }
      } else {
        const name = '';
        await this.getListByName(name);
        this.setState({ isShowItem: 0, currentPage: 1 });
      }
    } else {
      AntMessage.error('删除失败');
    }
  }

  updateStore = async () => {
    AntMessage.success('保存成功');
    const { isShowItem } = this.state;
    const { pid } = this.props.SystemStore;
    if (isShowItem === 4) {
      const {
        callbacks: { getEnterWithType },
        onHideMerchantListModal,
      } = this.props;
      const options = {
        pid,
        type: 2,
      };
      await getEnterWithType(options);
      onHideMerchantListModal();
    } else {
      const name = '';
      await this.getListByName(name);
      this.setState({ isShowItem: 0 });
    }
  };

  handleSubmitEditShop() {
    const { isShowItem } = this.state;
    if (isShowItem === 4) {
      DotPoint.dot({
        pagename: 'wm_fillinfo',
        elementid: 'save',
        eventtype: 'tap',
      });
    }
  }

  closeTips = () => {
    this.setState({
      deletePid: -1,
    });
  };

  render() {
    const {
      merchantListModalVisible,
      onHideMerchantListModal,
      urls,
      SystemStore: { wid },
      XinyunStore: { merchantsList, info, industries },
      callbacks,
      utils,
    } = this.props;
    const {
      isShowSearch,
      listType,
      inputValue,
      searchValue,
      isShowItem,
      currentPage,
      pageSize,
      switching,
      operatingPid,
      errInfos,
      deletePid,
      loading,
    } = this.state;

    const itemTitle = (
      <div className={style.modalTitle} onClick={this.closeTips}>
        <span>{isShowItem === 4 ? '为您的店铺完善信息' : '选择店铺'}</span>
        <span>
          {isShowSearch ? (
            <i className={style.search} onClick={this.handleChange} />
          ) : (
            <div className={style.searchDiv}>
              <i className={style.search} onClick={this.handleChange} />
              <Input
                placeholder="请输入店铺名称"
                onChange={this.handleChangeName}
                onPressEnter={this.handleSearchMerchant}
                value={inputValue}
              />
              <i className={style.delete} onClick={this.handleClearAll} />
            </div>
          )}

          <i
            onClick={this.handleChangeListType}
            className={classNames(
              listType === 0 ? style.typeCard : style.typeList
            )}
          />
          <i className={style.close} />
        </span>
      </div>
    );
    const backTitle = (
      <div className={style.modalTitle}>
        {isShowItem === 4 ? (
          [
            <span key="title">为您的店铺完善信息</span>,
            <span key="close">
              <i className={style.close} />
            </span>,
          ]
        ) : (
          <span onClick={this.handleBack} style={{ cursor: 'pointer' }}>
            <i className={style.back} />
            <b style={{ marginLeft: 5 }}> 返回</b>
          </span>
        )}
      </div>
    );

    return (
      <CommonModal
        visible={merchantListModalVisible}
        onCancel={onHideMerchantListModal}
        wrapClassName={style.merchantListModal}
        title={isShowItem === 0 || isShowItem === 3 ? itemTitle : backTitle}
      >
        {isShowItem === 0 && (
          <div className={style.merchantsListWrap} onClick={this.closeTips}>
            {// 上一页
            listType === 0 && currentPage > 1 ? (
              <div
                className={style['prev-shop']}
                onClick={this.handleScrollPrev}
              >
                <i className="sfci sfci-prev-page" />
              </div>
            ) : null}
            {// 下一页
            listType === 0 && currentPage * pageSize < merchantsList.length ? (
              <div
                className={style['next-shop']}
                onClick={this.handleScrollNext}
              >
                <i className="sfci sfci-next-page" />
              </div>
            ) : null}
            <Loading loading={loading} />
            {listType === 0 ? (
              <ul
                className={classNames(
                  style.merchantsList,
                  style.justifyContentCenter,
                  switching > 0 ? style.fadeInRight : null,
                  switching < 0 ? style.fadeInLeft : null
                )}
              >
                <div
                  className={
                    listType === 0 &&
                    currentPage > 1 &&
                    merchantsList.slice(
                      (currentPage - 1) * pageSize,
                      currentPage * pageSize
                    ).length === 3
                      ? style.merchantItemHasBackLeft
                      : style.merchantItemNoBackLeft
                  }
                />
                {merchantsList
                  .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                  .map(merchantItem => (
                    <MerchantItemBig
                      key={merchantItem.id}
                      {...merchantItem}
                      handleParentEditShop={this.handleEditShop}
                      handleParentDelShop={this.handleValidCanDelShop}
                      errInfos={errInfos}
                      deletePid={deletePid}
                      handleParentCloseTips={this.closeTips}
                      callbacks={callbacks}
                    />
                  ))}
                <div
                  className={
                    listType === 0 &&
                    currentPage * pageSize < merchantsList.length
                      ? style.merchantItemHasBackRight
                      : style.merchantItemNoBackRight
                  }
                />
              </ul>
            ) : (
              <ul
                className={classNames(
                  style.merchantsList,
                  style.merchantsListSmall
                )}
              >
                {merchantsList.map((merchantItem, index) => (
                  <MerchantItemSmall
                    key={merchantItem.id}
                    index={index}
                    {...merchantItem}
                    handleParentEditShop={this.handleEditShop}
                    handleParentDelShop={this.handleValidCanDelShop}
                    errInfos={errInfos}
                    deletePid={deletePid}
                    callbacks={callbacks}
                    handleParentCloseTips={this.closeTips}
                  />
                ))}
              </ul>
            )}
            {searchValue === '' ? (
              <div className={style.modalFooter}>
                <a
                  className={style.createShopBtn}
                  href={`${urls.originDOMAIN}/#/app/solution/list`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>新建店铺</span>
                </a>
              </div>
            ) : (
              <div className={style.modalFooter}>
                <a className={style.searchResultBtn}>
                  <span>
                    匹配到
                    {merchantsList.length}个{`"${searchValue}"`}
                  </span>
                </a>
              </div>
            )}
          </div>
        )}
        {(isShowItem === 1 || isShowItem === 4) && (
          <div>
            <MerchantEdit
              utils={utils}
              callbacks={callbacks}
              operatingPid={operatingPid}
              updateParentStore={this.updateStore}
              onSubmitEditShop={this.handleSubmitEditShop}
              wid={wid}
              industries={industries}
              isShowItem={isShowItem}
            />
          </div>
        )}
        {isShowItem === 2 && (
          <div className={style.merchantDeleteWrap}>
            <MerchantDelete
              phone={info.phone}
              sendCode={this.handleSendCode}
              submitDeleteShop={this.handleSubmitDeleteShop}
            />
          </div>
        )}
        {isShowItem === 3 && (
          <div className={style.emptyResult}>
            <img alt="" style={{ width: 140, marginTop: -70 }} src={imgUrl} />
            <div className={style.modalFooter}>
              <a className={style.searchResultBtn}>
                <span>
                  匹配到
                  {merchantsList.length}个{`"${searchValue}"`}
                </span>
              </a>
            </div>
          </div>
        )}
      </CommonModal>
    );
  }
}
