import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import { Layout, Menu, Dropdown, Badge } from 'antd';
import style from './index.module.less';
import iconMore from './assets/icons/more.svg';
import MerchantListModal from './modals/merchantListModal';

const { Header: AntHeader } = Layout;
const { Item: MenuItem } = Menu;

class Header extends React.Component {
  static propTypes = {
    // 存放 pid, storeId, wid
    SystemStore: PropTypes.shape({
      // 系统名称，源于env.js，示例`smartcounter`，`supplier`
      systemName: PropTypes.string.isRequired,

      // packKey, 适配部分拦截页配置
      packKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

      // pid
      pid: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,

      // storeId
      storeId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,

      // wid
      wid: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    }).isRequired,

    // didMount时调用的函数
    didMountHooks: PropTypes.arrayOf(
      PropTypes.shape({
        hook: PropTypes.func.isRequired, // 方法
        params: PropTypes.shape({}), // 参数
      }).isRequired
    ),

    // 定时器钩子
    timerHooks: PropTypes.arrayOf(
      PropTypes.shape({
        hook: PropTypes.func.isRequired, // 方法
        ms: PropTypes.number.isRequired, // 延时，ms 为单位
        params: PropTypes.shape({}), // 参数
      }).isRequired
    ),

    // 各个环境超链接
    urls: PropTypes.shape({}).isRequired,

    // 工具方法
    utils: PropTypes.shape({
      removeToken: PropTypes.func.isRequired,
    }).isRequired,

    // 新云数据，需要存放的
    XinyunStore: PropTypes.shape({
      merchantsList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
      getMerchantList: PropTypes.func.isRequired,
      updateMessage: PropTypes.func.isRequired,
      getMsgCount: PropTypes.number.isRequired,
      message: PropTypes.shape([]).isRequired,
    }).isRequired,

    // 直接调用的钩子函数
    callbacks: PropTypes.shape({
      validCanDropMerchant: PropTypes.func.isRequired,
      getEnter: PropTypes.func.isRequired,
      getEnterWithType: PropTypes.func.isRequired,
    }),

    // 是否显示某些元素
    bools: PropTypes.shape({
      hideMessage: PropTypes.bool, // 隐藏消息
      hideQualify: PropTypes.bool, // 隐藏认证
    }),
  };

  static defaultProps = {
    didMountHooks: [],
    timerHooks: [],
    callbacks: {},
    bools: {
      hideMessage: false,
      hideQualify: false,
    },
  };

  constructor(props) {
    super(props);
    this.timers = [];
    this.bindMethods();
    this.state = {
      merchantListModalVisible: false,
    };
  }

  async componentDidMount() {
    const { didMountHooks, timerHooks } = this.props;

    // 并行执行 didMount 钩子函数
    const didMountHooksPromises = didMountHooks.map(({ hook, params }) =>
      hook(params)
    );
    await Promise.all(didMountHooksPromises);
    await this.countToShow();

    // 依次初始化定时器
    this.timers = timerHooks.map(({ hook, params, ms }) =>
      setInterval(() => {
        hook(params);
      }, ms)
    );
  }

  componentWillUnmount() {
    this.clearTimers();
  }

  bindMethods() {
    const methods = [
      'clearTimers',
      'jumpLogout',
      'toMsg',
      'clearMsg',
      'toSettings',
      'qualify',
      'handleSwitchMerchantListModal',
      'countToShow',
    ];
    methods.forEach(methodName => {
      this[methodName] = this[methodName].bind(this);
    });
  }

  clearTimers() {
    // 依次清除定时器
    while (this.timers.length) {
      let lastTimer = this.timers.pop();
      clearInterval(lastTimer);
      lastTimer = null;
    }
  }

  jumpLogout() {
    const {
      utils: { removeToken },
      urls: { logoutURL },
    } = this.props;
    this.clearTimers();
    removeToken();
    window.location.href = logoutURL;
  }

  async toMsg(parentChannel) {
    const {
      urls: { retailURL },
      XinyunStore: { readMsg },
      SystemStore: { pid, storeId },
    } = this.props;
    const data = await readMsg(parentChannel);
    if (data && !data.errcode) {
      window.location.href = `${retailURL}${pid}/${storeId}/order/order/orderlist?page=1&count=20&orderStatuses=4`;
    }
  }

  async clearMsg() {
    const {
      XinyunStore: { readMsg, updateMessage },
      SystemStore: { pid, storeId },
    } = this.props;
    const data = await readMsg();
    if (data && !data.errcode) {
      updateMessage(pid, storeId);
    }
  }

  toSettings() {
    const {
      urls: { retailURL },
      SystemStore: { pid, storeId },
    } = this.props;
    window.location.href = `${retailURL}${pid}/${storeId}/setting/systemset/messagenotificate?activeTab=2}`;
  }

  qualify() {
    const {
      urls: { basicURL },
      SystemStore: { pid, storeId },
    } = this.props;
    window.location.href = `${basicURL}${pid}/${storeId}/qualification/application/progress`;
  }

  handleSwitchMerchantListModal() {
    /* eslint-disable react/no-string-refs */
    const {
      callbacks: { getEnterWithType },
      SystemStore: { pid },
    } = this.props;
    const { isShowItem } = this.refs.modal.state;
    if (isShowItem === 4) {
      const options = {
        pid,
        type: 2,
      };
      getEnterWithType(options);
    }
    this.setState(
      {
        merchantListModalVisible: !this.state.merchantListModalVisible,
      },
      () => {
        this.refs.modal.handleSetSearch();
      }
    );
  }

  countToShow() {
    const {
      XinyunStore: { count, displayInfo = {} },
      SystemStore: { systemName, packKey },
    } = this.props;
    if (systemName === 'smartcounter' && packKey === '6002') {
      this.setState({
        merchantListModalVisible: false,
      });
    } else if (count >= 2 && displayInfo && !displayInfo['2']) {
      this.setState({
        merchantListModalVisible: true,
      });
      this.refs.modal.handleFirstEditShop();
    } else {
      this.setState({
        merchantListModalVisible: false,
      });
    }
  }

  render() {
    // XinyunStore 是一个 mobx 实例，不能通过`...`展开传下去
    const {
      XinyunStore,
      SystemStore,
      callbacks,
      urls,
      utils,
      bools,
    } = this.props;

    const { merchantName, getMsgCount, message } = XinyunStore;
    const { merchantListModalVisible } = this.state;
    const { originDOMAIN } = urls;
    const { hideMessage, hideQualify } = bools;

    const menu = (
      <ul className={style.menu}>
        <li
          onClick={this.handleSwitchMerchantListModal}
          className={style.menuLiFirst}
        >
          <a>
            <i />
            <span>切换店铺</span>
          </a>
        </li>
        <li className={style.menuLiSecond}>
          <a
            href={`${originDOMAIN}/#/app/account/edit/`}
            target="_blank"
            rel="noreferrer noopener"
          >
            <i />
            <span>账号信息</span>
          </a>
        </li>
        <li className={style.menuLiThird}>
          <a
            href="http://help.console.weimob.com/#/app/start"
            target="_blank"
            rel="noreferrer noopener"
          >
            <i />
            <span>帮助中心</span>
          </a>
        </li>
        <li className={style.menuLiFour}>
          <a
            href="http://www.weimob.com/website/end1.html"
            target="_blank"
            rel="noreferrer noopener"
          >
            <i />
            <span>返回旧版</span>
          </a>
        </li>
        <li className={style.menuLiFive}>
          <a onClick={this.jumpLogout}>
            <i />
            <span>退出账号</span>
          </a>
        </li>
      </ul>
    );

    const box = (
      <div className={style.box}>
        <div className={style.msgTitle}>
          <span>
            {getMsgCount ? `您有${getMsgCount}条未读消息` : '暂无未读通知'}
          </span>
          <i
            className="fa fa-cog"
            style={{ cursor: 'pointer' }}
            onClick={this.toSettings}
          />
        </div>
        <Menu className={style.boxMenu}>
          {Array.isArray(message) && message.length ? (
            message.map((item, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <MenuItem key={index} className={style.boxMenuItem}>
                <div
                  className={style.msgItemContainer}
                  onClick={() => this.toMsg(item.parentChannel)}
                >
                  <div className={style.msgIcon}>
                    <img src={item.icon} alt="msgIcon" />
                  </div>
                  <div className={style.msgContent}>
                    <div className={style.msgInfo}>
                      <span className={style.num}>{item.num}</span>
                      {item.message}
                    </div>
                    <div className={style.msgTime}>
                      {moment(item.lastTime, 'x').format('YYYY-MM-DD HH:MM:SS')}
                    </div>
                  </div>
                </div>
              </MenuItem>
            ))
          ) : (
            <div className={style.emptyMsg} />
          )}
        </Menu>
        {Array.isArray(message) && message.length ? (
          <div className={style.clearMsg} onClick={this.clearMsg}>
            <a>清空全部未读</a>
          </div>
        ) : null}
      </div>
    );

    // 所有的弹窗组件
    /* eslint-disable react/no-string-refs */
    const modals = (
      <div className={style.modals} style={{ display: 'none' }}>
        <MerchantListModal
          callbacks={callbacks}
          XinyunStore={XinyunStore}
          SystemStore={SystemStore}
          urls={urls}
          utils={utils}
          merchantListModalVisible={merchantListModalVisible}
          onHideMerchantListModal={this.handleSwitchMerchantListModal}
          ref="modal"
        />
      </div>
    );

    return (
      <AntHeader className={style.header}>
        <div className={style.merchantName} title={merchantName}>
          {merchantName}
        </div>

        <div className={style.container}>
          {!hideQualify && (
            <div className={style.item} onClick={this.qualify}>
              店铺认证
            </div>
          )}
          {!hideMessage && (
            <div className={classNames(style.msg, style.item)}>
              <Dropdown
                align={{
                  offset: [-200, -12],
                }}
                overlay={box}
                className={style.msg}
              >
                <div>
                  消息
                  <Badge count={getMsgCount} />
                </div>
              </Dropdown>
            </div>
          )}
          <Dropdown
            align={{
              offset: [0, -12],
            }}
            overlay={menu}
            className={style['user-drop-down']}
          >
            <div className={style.more}>
              <img src={iconMore} alt="" style={{ width: 20, height: 21 }} />
            </div>
          </Dropdown>
        </div>
        {modals}
      </AntHeader>
    );
  }
}

export default Header;
