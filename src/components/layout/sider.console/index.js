import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { Layout, Avatar, Menu, message as AntMessage } from 'antd';
import { findMatch } from '../../../utils/helper';
import { logoutURL } from '../../../utils/env';
import style from './index.module.less';

const AntSider = Layout.Sider;
const { SubMenu } = Menu;

@withRouter
@inject('SystemStore')
@inject('XinyunStore')
@observer
class Sider extends React.Component {
  static propTypes = {
    XinyunStore: PropTypes.shape({
      logo: PropTypes.string.isRequired,
      menu: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
      getKeyOrMenu: PropTypes.func.isRequired,
    }).isRequired,
    SystemStore: PropTypes.shape({
      pid: PropTypes.string.isRequired,
      storeId: PropTypes.string.isRequired,
      activeId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
      initIds: PropTypes.func.isRequired,
      saveActiveId: PropTypes.func.isRequired,
    }).isRequired,
    history: PropTypes.shape({
      location: PropTypes.shape({}).isRequired,
    }).isRequired,
  };

  async componentDidMount() {
    const { initIds, saveActiveId } = this.props.SystemStore;
    const { getKeyOrMenu } = this.props.XinyunStore;
    const {
      location: { pathname },
    } = this.props.history;
    const pid = pathname.split('/')[2];
    const storeId = pathname.split('/')[3];
    initIds(pid, storeId);
    await getKeyOrMenu(pid, storeId);
    const { menu } = this.props.XinyunStore;
    const activeId = findMatch(menu, pathname);
    if (activeId) {
      saveActiveId(activeId);
    } else {
      // AntMessage.info('您不具备访问该页面的权限', 3, () => {
      //     //window.location.href = logoutURL;
      // });
    }
  }

  shouldComponentUpdate(nextProps) {
    const {
      XinyunStore: { menu },
      location: { pathname },
    } = nextProps;
    const activeId = findMatch(menu, pathname);
    if (!activeId && menu.length) {
      // AntMessage.info('您不具备访问该页面的权限', 3, () => {
      //     //window.location.href = logoutURL;
      // });
      return false;
    }
    const { saveActiveId } = this.props.SystemStore;
    saveActiveId(activeId);
    return true;
  }

  onTitleClick = (menuId, url) => {
    const { saveActiveId } = this.props.SystemStore;
    saveActiveId(menuId);
    window.location.href = url;
  };

  render() {
    const { logo, menu } = this.props.XinyunStore;
    const { activeId } = this.props.SystemStore;

    return (
      <AntSider className={style.sider} width={120}>
        <div className={style.container}>
          <Avatar size="large" src={logo} style={{ backgroundColor: '#FFF' }} />
        </div>
        <Menu theme="dark" mode="inline" className={style.menu}>
          {menu.map(item => (
            <SubMenu
              onTitleClick={() =>
                this.onTitleClick(item.id, item.url, item.authCode)
              }
              className={classNames(style.submenu, {
                [style.submenuActive]: item.id === activeId,
              })}
              title={
                <div>
                  <span className={style.iconContainer}>
                    <svg className={style.icon} aria-hidden="true">
                      <use
                        xlinkHref={
                          item.icon ? `#${item.icon}` : '#icon-setting'
                        }
                      />
                      <use
                        xlinkHref={
                          item.icon
                            ? `#${item.icon}-active`
                            : '#icon-setting-active'
                        }
                        className={style.iconActive}
                      />
                    </svg>
                  </span>
                  <span>{item.name}</span>
                </div>
              }
              key={item.id}
            />
          ))}
        </Menu>
        <div className={style.logo}>
          <img
            alt="logo"
            width="80"
            src="https://retail.console.weimob.com/assets/images/weimob-logo.png"
          />
        </div>
      </AntSider>
    );
  }
}

export default Sider;
