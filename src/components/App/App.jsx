import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import { Layout } from 'antd';
import Nav from 'components/Nav/Nav.jsx';
import getRouter from 'router/router';
import './app.scss'

const { Header, Content, Sider } = Layout;

export default class App extends Component {
    render(){
        return (
            <Router>
                <Layout>
                    <Sider style={{
      overflow: 'auto', height: '100vh', position: 'fixed', left: 0,
    }}>
                        <Nav/>
                    </Sider>
                    
                    <Layout style={{ marginLeft: 200 }}>
                        <Header>头部</Header>
                        <Content style={{padding:"20px"}}>
                        {getRouter()}
                        </Content>
                    </Layout>
                </Layout>
            </Router>
        )
    }
}