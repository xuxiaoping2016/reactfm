import * as React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from '../pages/Home'
import Hello from '../pages/Hello'
import Dustbin from '../pages/Dustbin'
import Dustbin1 from '../pages/Dustbin/single'
import DustbinHook from '../pages/Dustbin/singleHook'
import ChessBoard from '../pages/Chessboard'
import Counter from '../pages/counter'

import CustomDragLayer from '../pages/DragAround/CustomDragLayer'
import Native from '../pages/DragAround/Naive'

const Child = () => (
    <Dustbin>
        <Route path="/dustbin/child1" component={Dustbin1}/>
        <Route path="/dustbin/child2" component={DustbinHook}/>
    </Dustbin>
)
class Routes extends React.Component {
    public render(){
        return (
            <Switch>
                <Route path="/button" component = {Home}/>
                <Route path="/hello" component = {Hello}/>
                <Route path="/dustbin" render = {Child}/>
                <Route path="/chessboard" component={ChessBoard}/>
                <Route path="/counter" component={Counter}/>

                <Route path="/dragaround" component={CustomDragLayer}/>
                <Route path="/dragaroundnative" component={Native}/>
            </Switch>
        )
    }
}

export default Routes; 