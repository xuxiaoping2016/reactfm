import React from 'react'

const HOCComponent = PackagedComponent =>
  class HOC extends React.Component {
    render() {
        const { title } = this.props;
      return (
        <div id="HOCWrapper">
          <header>
            <h1>{title}</h1>
          </header>
          <PackagedComponent/>
        </div>
      )
    }
}

@HOCComponent 
export default class Main extends React.Component {
    render() {
        return(
            <p>main content</p>
        )
    }
}