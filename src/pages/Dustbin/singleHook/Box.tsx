import * as React from 'react'
import { __EXPERIMENTAL_DND_HOOKS_THAT_MAY_CHANGE_AND_BREAK_MY_BUILD__ as dnd } from 'react-dnd'
import ItemTypes from './ItemTypes'
const {
	useDrag,
} = dnd

const style: React.CSSProperties = {
	border: '1px dashed gray',
	backgroundColor: 'white',
	padding: '0.5rem 1rem',
	marginRight: '1.5rem',
	marginBottom: '1.5rem',
	cursor: 'move',
	float: 'left',
}

interface BoxProps {
	name: string
}

const Box: React.FC<BoxProps> = ({ name }) => {
	const item = { name, type: ItemTypes.BOX }

	const [{ isDragging }, ref] = useDrag({
		item,
		end: (dropResult?: { name: string }) => {
			if (dropResult) {
				alert(`You dropped ${item.name} into ${dropResult.name}!`)
			}
		},
		collect: monitor => ({
			isDragging: monitor.isDragging(),
		}),
	})
	const opacity = isDragging ? 0.4 : 1

	return (
		<div ref={ref} style={{ ...style, opacity }}>
			{name}
		</div>
	)
}

export default Box