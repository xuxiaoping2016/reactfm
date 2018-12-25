import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import memoize from 'memoize-one';
import classNames from 'classnames';
import { Icon } from 'antd';
import { findSubMatch } from '../../../utils/helper';
import style from './index.module.less';

@withRouter
@inject('XinyunStore')
@inject('SystemStore')
@inject('ParamsStore')
@observer
class SubSider extends React.Component {
  onClick = url => {
    const { reset } = this.props.ParamsStore;
    reset();
    window.location.href = url;
  };

  static propTypes = {
    history: PropTypes.shape({
      location: PropTypes.shape({}).isRequired,
    }).isRequired,
    ParamsStore: PropTypes.shape({
      reset: PropTypes.func.isRequired,
    }).isRequired,
    SystemStore: PropTypes.shape({
      activeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    }).isRequired,
    XinyunStore: PropTypes.shape({
      menu: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    }).isRequired,
  };

  filterSubMenu = memoize((activeId, pathname, menu) => {
    const [match] = menu.filter(p => p.id === activeId);
    const subMenu = Object.values((match || {}).child || {});
    const subMenuId = findSubMatch(subMenu, pathname);
    return {
      subMenu,
      subMenuId,
    };
  });

  render() {
    const { activeId } = this.props.SystemStore;
    const { menu } = this.props.XinyunStore;
    const {
      location: { pathname },
    } = this.props.history;
    const { subMenu, subMenuId } = this.filterSubMenu(activeId, pathname, menu);

    return (
      <div className={style.subSider}>
        <div className={style.wrapper}>
          {subMenu.map(item => {
            if (!item.url) {
              return (
                <div key={item.id}>
                  <div className={style.title}>{item.name}</div>
                  <ul>
                    {Object.values(item.child || {}).map(p => (
                      <li
                        className={classNames(style.item, {
                          [style.active]: p.id === subMenuId,
                        })}
                        key={p.id}
                        onClick={() => this.onClick(p.url)}
                      >
                        <span>{p.name}</span>
                        <Icon type="caret-right" className={style.icon} />
                      </li>
                    ))}
                  </ul>
                  <div className={style.separator} />
                </div>
              );
            }
            return (
              <div
                className={classNames(style.item, {
                  [style.active]: item.id === subMenuId,
                })}
                key={item.id}
                onClick={() => this.onClick(item.url)}
              >
                <span>{item.name}</span>
                <Icon type="caret-right" className={style.icon} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default SubSider;
