import * as React from 'react'
import {
	DropTarget,
	DropTargetConnector,
	DropTargetMonitor,
	ConnectDropTarget,
} from 'react-dnd'
import ItemTypes from './ItemTypes'

const style: React.CSSProperties = {
	height: '12rem',
	width: '12rem',
	marginRight: '1.5rem',
	marginBottom: '1.5rem',
	color: 'white',
	padding: '1rem',
	textAlign: 'center',
	fontSize: '1rem',
	lineHeight: 'normal',
	float: 'left',
}


export interface DustbinProps {
	canDrop: boolean
	isOver: boolean
	connectDropTarget: ConnectDropTarget
}

interface BoxProps {
    name:string,
    age:number
}

const boxTarget = {
	drop(props:BoxProps, monitor:DropTargetMonitor) {
        console.log(
        monitor.canDrop(),         // 是否可被放置  true
        monitor.isOver() ,  // source是否在target上方  true
        monitor.getItemType(),     // 拖拽组件type  "box"
        monitor.getItem(),         // 当前拖拽的item  {name: "Glass"}
        monitor.getDropResult(),   // 查询drop结果   null
        monitor.didDrop(),         // source是否已经drop在target  false
        monitor.getInitialClientOffset(),   // 拖拽组件初始拖拽时offset  {x: 248, y: 196}
        monitor.getInitialSourceClientOffset(),  // {x: 220, y: 188.8000030517578}
        monitor.getClientOffset(), // 拖拽组件当前offset   {x: 281, y: 105}
        monitor.getDifferenceFromInitialOffset(), // 当前拖拽offset和初始拖拽offset的差别  {x: 33, y: -91}
        monitor.getSourceClientOffset()  // {x: 253, y: 97.80000305175781}
        )
		return { name: 'Dustbin' }
	},
}

class Dustbin extends React.Component<DustbinProps> {
	public render() {
        // this.props 是组件调用时加的属性和 collect
        // console.log("Dustbin props",this.props)
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
	ItemTypes.BOX,
	boxTarget,
	(connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        im:"fdfd"
	}),
)(Dustbin)