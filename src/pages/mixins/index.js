import React, {Component} from 'react';
import { AComponent, BComponent } from './demo1'
import Demo2 from './demo2'

// Reactjs Mixins  https://segmentfault.com/a/1190000002704788

class Mixins extends Component {

    render() {
        
        return (
            <div>
                <AComponent />
                <BComponent />
            </div>
        )
    }
}

export default Mixins;
