// 强大的拖拽组件：React DnD 的使用
// https://segmentfault.com/a/1190000014723549

import React, { Component } from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Dustbin from './Dustbin.tsx'
import Box from './Box.tsx'

@DragDropContext(HTML5Backend)
export default class Container extends Component {
	render() {
        console.log('home',this.props)
		return (
			<div>
                <div>拖拽</div>
				<div style={{ overflow: 'hidden', clear: 'both' }}>
					<Dustbin n="fd"/>
				</div>
				<div style={{ overflow: 'hidden', clear: 'both' }}>
					<Box name="Glass" m="fd" />
					<Box name="Banana" />
					<Box name="Paper" />
				</div>
			</div>
		)
	}
}