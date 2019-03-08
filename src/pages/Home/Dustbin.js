import React, { Component } from 'react'
import {
	DropTarget,
	// ConnectDropTarget,
} from 'react-dnd'
import ins from './constants'

const style = {
	height: '180px',
	width: '180px',
	marginRight: '20px',
	marginBottom: '20px',
	color: 'white',
	padding: '10px',
	textAlign: 'center',
	fontSize: '20px',
	lineHeight: 'normal',
	float: 'left',
}

const boxTarget = {
	drop() {
		return { name: 'Dustbin' }
	},
}

class Dustbin extends Component {
    // componentDidMount(){
    //     console.log('componentDidMount')
    // }
	render() {
		const { canDrop, isOver, connectDropTarget } = this.props
		const isActive = canDrop && isOver

		let backgroundColor = '#222'
		if (isActive) {
			backgroundColor = 'darkgreen'
		} else if (canDrop) {
			backgroundColor = 'darkkhaki'
        }
		return connectDropTarget(
			<div style={{ ...style, backgroundColor }}>
				{isActive ? 'Release to drop' : 'Drag a box here'}
			</div>,
		)
	}
}

export default DropTarget(
	ins.BOX,
	boxTarget,
	(connect, monitor) => {
        // console.log("connect",connect)
        // console.log("monitor",monitor)
        return {
            connectDropTarget: connect.dropTarget(),
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }   
    },
)(Dustbin)

