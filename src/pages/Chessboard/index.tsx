import * as React from 'react'
import ChessBoard1 from './board'
// import { Link } from 'react-router-dom'

// const ulstyle: React.CSSProperties = {
//     display:"flex"
// }
// const listyle: React.CSSProperties = {
//    flex:1
// }

export default class ChessBoard extends React.Component {
    public render(){
        return (
            <div>
                {/* <ul style={ulstyle}>
                    <li style={listyle}><Link to="/mobxdemo/child1">单个拖拽</Link></li>
                    <li style={listyle}><Link to="/mobxdemo/child2">单个拖拽 hooks</Link></li>
                </ul> 
                {this.props.children} */}
                <ChessBoard1/>
            </div>
        )
    }
}