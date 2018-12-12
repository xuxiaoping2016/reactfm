import React, { Component } from 'react';
import TableList from './memoizeOne.jsx'

export default class Index extends Component {
  state = { 
    list :[
      {id:1,text:"记忆化技术1"},
      {id:2,text:"记忆化技术2"},
      {id:3,text:"记忆化技术3"},
      {id:4,text:"记忆化技术4"},
      {id:5,text:"TableList"},
      {id:6,text:"名字年纪学历"},
    ] 
  };

  render() {
    const { list } = this.state;
    return (
      <div>
        <TableList list={list}/>
      </div>
    )
  }
}