import React from 'react';
import PropsTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Layout, Menu, Dropdown, Icon } from 'antd';
import { wisdomURL } from '../../../utils/env';
import style from './index.module.less';

const { Header: AntHeader } = Layout;
const { Item: MenuItem } = Menu;

@withRouter
@inject('XinyunStore')
@inject('SystemStore')
@observer
class Header extends React.Component {
  static propTypes = {
    SystemStore: PropsTypes.shape({
      pid: PropsTypes.string.isRequired,
      storeId: PropsTypes.string.isRequired,
    }).isRequired,
    XinyunStore: PropsTypes.shape({
      merchantsList: PropsTypes.array.isRequired,
      getMerchantList: PropsTypes.func.isRequired,
    }).isRequired,
    history: PropsTypes.shape({
      location: PropsTypes.shape({}).isRequired,
    }).isRequired,
  };

  componentDidMount() {
    const {
      location: { pathname },
    } = this.props.history;
    const pid = pathname.split('/')[2];
    const { getMerchantList } = this.props.XinyunStore;
    getMerchantList(pid);
  }

  filterName = arr => {
    const {
      location: { pathname },
    } = this.props.history;
    const pid = pathname.split('/')[2];
    const match = arr.find(p => `${p.id}` === pid) || {};
    return match.merchantName;
  };

  onLogout = () => {
    const { pid } = this.props.SystemStore;
    window.location.href = `${wisdomURL}${pid}/storeChange`;
  };

  render() {
    const { merchantsList } = this.props.XinyunStore;

    const menu = (
      <Menu className={style.merchantList}>
        <MenuItem className={style.logout} onClick={this.onLogout}>
          <a>返回微商城</a>
        </MenuItem>
      </Menu>
    );

    return (
      <AntHeader className={style.header}>
        <div className={style.container}>
          <Dropdown
            align={{
              offset: [0, -12],
            }}
            overlay={menu}
            className={style['user-drop-down']}
          >
            <div className={style.username}>
              <span>{this.filterName(merchantsList)}</span>
              <Icon type="user" theme="outlined" className={style.arrow} />
            </div>
          </Dropdown>
        </div>
      </AntHeader>
    );
  }
}

export default Header;
