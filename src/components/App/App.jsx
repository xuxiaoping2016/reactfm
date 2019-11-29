import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import { Layout } from 'antd';
import Nav from 'components/Nav/Nav.jsx';
// import getRouter from 'router/router';
// import getRouter from 'router/routerBF2'
import getRouter from 'router/router3'
const { Header, Content, Footer, Sider } = Layout;

export default class App extends Component {
    render(){
        return (
            <Router>
                <Sider
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                }}
                >
                    <div className="logo" />
                    <Nav />
                </Sider>
                <Layout style={{ marginLeft: 200 }}>
                    <Header style={{ background: '#fff', padding: 0 }} />
                    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                        {getRouter()}
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Router>
        )
    }
}