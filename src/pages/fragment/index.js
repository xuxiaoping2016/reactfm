import React, {Component} from 'react';
import Demo1 from './demo1'
import Demo2 from './demo2'

const data = [
    {id:1, term:"目录1", description:"买书描述"},
    {id:2, term:"目录2", description:"买书描述"},
    {id:3, term:"目录3", description:"买书描述"},
    {id:4, term:"目录4", description:"买书描述"},
    {id:5, term:"目录5", description:"买书描述"},
]
class ContextDemo extends Component {

    render() {
        
        return (
            <div>
                <Demo1 />
                <Demo2 items={data} />
            </div>
        )
    }
}

export default ContextDemo;
