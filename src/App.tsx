import * as React from 'react';
import { BrowserRouter as Router} from 'react-router-dom'
import Nav from './components/Nav/Nav';
import { Layout } from 'antd'; 

// import getRouter from './router';

import './App.css';


const { Header, Content, Sider } = Layout;

class App extends React.Component {
  public render() {
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
                {this.props.children}
                </Content>
            </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App;
