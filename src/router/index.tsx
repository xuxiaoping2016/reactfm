import * as React from 'react'
import { Route, Switch } from 'react-router-dom'

import Dustbin from '../pages/Dustbin'

class Routes extends React.Component {
    render(){
        return (
            <Switch>
                <Route path='/' component={Dustbin}/>
            </Switch>
        )
    }
}

export default Routes; 