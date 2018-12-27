import React, { Component } from 'react';
import { Input, Checkbox } from 'antd'
import data from '../data'

const data1 = data.filter(item => 
    item.category === 'Sporting Goods');
const data2 = data.filter(item => 
    item.category === 'Electronics')

class Demo1 extends Component {
    state = {
        searchVal:'',
        stocked: false,
        db:{ sport:data1,electronics:data2}
    }
    onChange = (ev) => {
        const val = ev.target.value
        this.setState({searchVal:val})
        const { stocked } = this.state;
        this.filterData({stocked, searchVal:val})
    }

    onSelectedChange = (ev) => {
        const val = ev.target.checked
        this.setState({stocked:val})
        const { searchVal } = this.state;
        this.filterData({stocked:val, searchVal})
    }

    filterData = filters => {
        const sport = data1.filter(item => {
            if(filters.stocked){
                return item.name.includes(filters.searchVal) && item.stocked === true;
            }
            return item.name.includes(filters.searchVal)
        })
        const electronics = data2.filter(item => {
            if(filters.stocked){
                return item.name.includes(filters.searchVal) && item.stocked === true;
            }
            return item.name.includes(filters.searchVal)
        })
        const db = {sport,electronics}
        this.setState({db})
    }

    render(){
        const {db} = this.state;
        return (
            <div>
                <div>
                    <Input placeholder="Username" onChange={this.onChange}/><br/>
                    <Checkbox onChange={this.onSelectedChange}>only show productd in stock</Checkbox>
                </div>
                
                <div>
                    <div><span>Name</span><span>Price</span></div>
                    <ul>
                        <li>Sporting Goods</li>
                        {db.sport.map((item,mark) => 
                            <li key={mark}><span>{item.name}</span><span>{item.price}</span></li>
                        )}
                    </ul>

                    <ul>
                        <li>Electronics</li>
                        {db.electronics.map((item,mark) => 
                            <li key={mark}><span>{item.name}</span><span>{item.price}</span></li>
                        )}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Demo1;