import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import classNames from 'classnames';
import AntUploadList from 'antd/lib/upload/UploadList';
import Card from './card';
import styles from './index.module.less';

@DragDropContext(HTML5Backend)
export default class UploadList extends AntUploadList {
  render() {
    const { moveCard } = this.props;
    const element = super.render();
    const { className, children } = element.props;
    return React.createElement(
      'div',
      { className: classNames(className, styles.cards) },
      React.Children.map(children, (child, i) => (
        <Card key={child.key} index={i} id={child.key} moveCard={moveCard}>
          {child}
        </Card>
      ))
    );
  }
}
