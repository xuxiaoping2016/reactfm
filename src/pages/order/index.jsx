import React, {Component} from 'react';
import Search from './search'

export default class Order extends Component{
    render(){
        return(
            <div className='todoView'>
                <Search />
            </div>
        )
    }
}