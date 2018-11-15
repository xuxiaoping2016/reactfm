import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Layout } from 'antd';
import Header from '../header';
import Sider from '../sider';
import SubSider from '../subSider';
import style from './index.module.less';
import * as envs from '../../../utils/env';
import { convertToCascader, convertDataToForm } from '../../../utils/helper';
import location from '../../../utils/district';
import {
  validCanDropMerchant,
  getEnter,
  getEnterWithType,
  getCode,
  dropMerchant,
  fetchLogo,
  uploadLogo,
  modifyMerchant,
} from '../../../services/xinyun';

const {
  logoutURL,
  originDOMAIN,
  getToken,
  getPid,
  getStoreId,
  removeToken,
  retailURL,
  basicURL,
} = envs;
const { newLocation } = location;
const urls = { logoutURL, originDOMAIN, retailURL, basicURL };
const utils = {
  getToken,
  getPid,
  getStoreId,
  removeToken,
  convertToCascader,
  convertDataToForm,
  newLocation,
};

const { Content } = Layout;

@withRouter
@inject(({ SystemStore, XinyunStore, financeStore }) => ({
  SystemStore,
  XinyunStore,
  financeStore,
}))
@observer
class Basic extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    history: PropTypes.shape({}).isRequired,
    XinyunStore: PropTypes.shape({}).isRequired,
    SystemStore: PropTypes.shape({}).isRequired,
  };

  async componentDidMount() {
    const {
      history: {
        location: { pathname },
      },
      XinyunStore: { getSelf, getLogo },
      SystemStore: { saveWId },
      financeStore: { getFidByBizUserId },
    } = this.props;
    const pid = pathname.split('/')[2];
    const [user] = await Promise.all([
      getSelf(),
      getLogo(pid),
      getFidByBizUserId(),
    ]);
    saveWId(user.wid);
  }

  render() {
    const { children, XinyunStore, SystemStore, history } = this.props;
    const {
      location: { pathname },
    } = history;
    const pid = pathname.split('/')[2];
    const storeId = pathname.split('/')[3];
    const { initIds } = SystemStore;
    initIds(pid, storeId);
    const headerProps = {
      urls,
      utils,
      XinyunStore,
      SystemStore: {
        ...SystemStore,
        packKey: '3001',
      },
      didMountHooks: [
        {
          hook: XinyunStore.getMerchantList,
          params: { pid },
        },
        {
          hook: XinyunStore.updateMessage,
          params: { pid, storeId },
        },
        {
          hook: XinyunStore.getIndustries,
        },
        {
          hook: XinyunStore.getCurrentInfo,
        },
      ],
      timerHooks: [
        {
          hook: XinyunStore.updateMessage,
          params: { pid, storeId },
          ms: 20 * 1000,
        },
      ],
      callbacks: {
        validCanDropMerchant,
        getEnter,
        getEnterWithType,
        getCode,
        dropMerchant,
        fetchLogo,
        uploadLogo,
        modifyMerchant,
      },
    };
    return (
      <Layout className={style.layout}>
        <Sider width="150" theme="dark" />
        <Layout>
          <Header className={style.header} {...headerProps} />
          <Content className={style.content}>
            <SubSider />
            <div className={style.view}>
              {React.cloneElement(children, this.props)}
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Basic;