import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Menu } from 'antd';
  const MenuItem = Menu.Item;
const menus = [
    {
        path:'/',
        label:'react的工作原理'
    },
    {
        path:'/thought',
        label:'react编程思想'
    },
    {
        path:'counter',
        label:'counter'
    },
    {
        path:'/context',
        label:'上下文 (Context)'
    },
    {
        path:'/errorboundaries',
        label:'错误边界(Error Boundaries)'
    },
    {
        path:'/refs',
        label:'转发 refs'
    },
    {
        path:'/fragment',
        label:'片段(Fragments)'
    },
    {
        path:'/mixins',
        label:'Mixins'
    },
    {
        path:'/hoc',
        label:'高阶组件(Higher-Order Components)'
    },
    {
        path:'/cooperation',
        label:'与第三方库协作'
    },
    {
        path:'/jsx',
        label:'深入JSX'
    },
    {
        path:'/performance',
        label:'性能优化'
    },
]

export default class Nav extends Component {
    render(){
        return (
            <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
            {menus.map((item,index) =>
            <MenuItem key={index}><Link to={item.path}>{item.label}</Link></MenuItem>
            )}
        </Menu>
        )
    }
}