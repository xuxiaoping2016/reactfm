import * as React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from '../pages/Home'
import Hello from '../pages/Hello'
import Dustbin from '../pages/Dustbin'
import Dustbin1 from '../pages/Dustbin/single'
import DustbinHook from '../pages/Dustbin/singleHook'
import ChessBoard from '../pages/Chessboard'

const Child = () => (
    <Dustbin>
        <Route path="/mobxdemo/child1" component={Dustbin1}/>
        <Route path="/mobxdemo/child2" component={DustbinHook}/>
    </Dustbin>
)
class Routes extends React.Component {
    public render(){
        return (
            <Switch>
                <Route path="/button" component = {Home}/>
                <Route path="/hello" component = {Hello}/>
                <Route path="/mobxdemo" render = {Child}/>
                <Route path="/chessboard" component={ChessBoard}/>
            </Switch>
        )
    }
}

export default Routes; 