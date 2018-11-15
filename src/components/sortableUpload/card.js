/*eslint-disable*/
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import styles from './index.module.less';

const ItemTypes = { CARD: 'card' };

const cardSource = {
    beginDrag(props) {
        return {
            id: props.uid,
            index: props.index,
        };
    },
};

const cardTarget = {
    hover(props, monitor, component) {
        if (!component) {
            return null;
        }
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;
        if (dragIndex === hoverIndex) {
            return;
        }
        props.moveCard(dragIndex, hoverIndex);
        monitor.getItem().index = hoverIndex;
    },
};

@DropTarget(ItemTypes.CARD, cardTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
}))
@DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}))
export default class Card extends React.Component {
    static propTypes = {
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
            .isRequired,
        index: PropTypes.number.isRequired,
        isDragging: PropTypes.bool.isRequired,
        connectDragSource: PropTypes.func.isRequired,
        connectDropTarget: PropTypes.func.isRequired,
        moveCard: PropTypes.func.isRequired,
    };
    render() {
        const {
            children,
            isDragging,
            connectDragSource,
            connectDropTarget,
        } = this.props;
        return (
            connectDragSource &&
            connectDropTarget &&
            connectDragSource(
                connectDropTarget(
                    <div
                        className={classnames(styles.card, {
                            draging: isDragging,
                        })}
                    >
                        {children}
                    </div>
                )
            )
        );
    }
}
