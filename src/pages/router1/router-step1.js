import React,{Component} from 'react'
import { render } from 'react-dom'


class About extends Component {
  render(){
    return <div>about</div>
  }
}

class Inbox extends Component {
  render(){
    return <div>Inbox</div>
  }
}

class Home extends Component {
  render(){
    return <div>Home</div>
  }
}


class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      route: window.location.hash.substr(1)
    }
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: window.location.hash.substr(1)
      })
    })
  }

  render() {
    let Child
    switch (this.state.route) {
      case '/about': Child = About; break;
      case '/inbox': Child = Inbox; break;
      default:      Child = Home;
    }

    return (
      <div>
        <h1>App</h1>
        <ul>
          <li><a href="#/about">About</a></li>
          <li><a href="#/inbox">Inbox</a></li>
        </ul>
        <Child/>
      </div>
    )
  }
}

render(<App />, document.getElementById('app'))