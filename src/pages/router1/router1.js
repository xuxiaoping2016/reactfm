import React,{Component} from 'react'
import { render } from 'react-dom'
import { HashRouter as Router, Route, Link ,Switch} from 'react-router-dom'

// import createHistory from 'history/createHashHistory';

// const history = createHistory();

class About extends Component {
  render(){
    return <div>about</div>
  }
}


const Message = ({ match }) => (
  <div>
    <h3>new messages</h3>
    <h3>{match.params.id}</h3>
  </div>
)

class Inbox extends Component {
  render(){
    const {match } = this.props
    console.log(match)
    return <div>
      <p>Inbox</p>
      <Route path={`${match.url}/message/:id`} component={Message}/>
    </div>
  }
}

class Home extends Component {
  render(){
    return <div>Home</div>
  }
}


class App extends Component{
  render() {

    return (
      <div>
        <h1>App</h1>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/inbox">Inbox</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}

render(
  (<Router>
    <App>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/inbox" component={Inbox} />
    </App>
  </Router>),
  document.getElementById('app') 
 )
