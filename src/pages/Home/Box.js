import React, { Component } from 'react'
import {
	ConnectDragSource,
	DragSource,
	DragSourceConnector,
	DragSourceMonitor,
} from 'react-dnd'
import ins from './constants'

const style = {
	border: '1px dashed gray',
	backgroundColor: 'white',
	padding: '10px 20px',
	marginRight: '10px',
	marginBottom: '10px',
	cursor: 'move',
	float: 'left',
}

const boxSource = {
	beginDrag(props,monitor, component) {
        console.log("beginDrag",props, monitor,component)
		return {
            name: props.name,
            h:"fdf"
		}
	},

	endDrag(props, monitor) {
        console.log("endDrag",props, monitor)
		const item = monitor.getItem()
		const dropResult = monitor.getDropResult()

		if (dropResult) {
			alert(`You dropped ${item.name} into ${dropResult.name}!`)
		}
    },
    
    // canDrag(props, monitor){
        // console.log("canDrag",props, monitor)
        //{name: "Banana"}
        //{sourceId: "S2", internalMonitor: DragDropMonitorImpl}
    // },

    isDragging(props, monitor){
        console.log("isDragging",props, monitor)
    }
}

class Box extends Component {
	render() {
		const { isDragging, connectDragSource } = this.props
		const { name } = this.props
		const opacity = isDragging ? 0.4 : 1

		return connectDragSource(<div style={{ ...style, opacity }}>{name}</div>)
	}
}

export default DragSource(
	ins.BOX,
	boxSource,
	(connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging(),
	}),
)(Box)
