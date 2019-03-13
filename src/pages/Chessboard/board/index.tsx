import * as React from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Board from './Board'
import { observe } from './Game'

export interface ChessboardTutorialAppState {
	knightPosition: [number, number]
}

const containerStyle: React.CSSProperties = {
	width: 500,
	height: 500,
	border: '1px solid gray',
}

/**
 * The Chessboard Tutorial Application
 */
const ChessboardTutorialApp: React.FC = () => {
	const [knightPos, setKnightPos] = React.useState<[number, number]>([1, 7])

	// the observe function will return an unsubscribe callback
	React.useEffect(() =>
		observe((newPos: [number, number]) => setKnightPos(newPos)),
	)
	return (
		<div>
			<h1>EXPERIMENTAL API</h1>
			<div style={containerStyle}>
				<Board knightPosition={knightPos} />
			</div>
		</div>
	)
}

export default DragDropContext(HTML5Backend)(ChessboardTutorialApp)