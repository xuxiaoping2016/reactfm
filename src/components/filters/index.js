import React from 'react';
import { Row, Card } from 'antd';
import classNames from 'classnames';
import { isNil } from 'lodash';
import PropsTypes from 'prop-types';
import style from './index.module.less';

class Filters extends React.Component {
  render() {
    const { onFilter, render, children, query, onConfirm } = this.props;

    return (
      <Card className={style.filters} bordered={false}>
        <Row className={style.row}>{render(onFilter, onConfirm, query)}</Row>
        <div
          className={classNames({
            [style.buttons]: !isNil(children),
          })}
        >
          {children}
        </div>
      </Card>
    );
  }
}

export default Filters;

Filters.propTypes = {
  query: PropsTypes.shape({}).isRequired,
  onFilter: PropsTypes.func.isRequired,
  onConfirm: PropsTypes.func.isRequired,
  render: PropsTypes.func.isRequired,
  children: PropsTypes.element,
};

Filters.defaultProps = {
  children: null,
};
