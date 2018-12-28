import React from 'react'

const HOCComponent = componentTitle => PackagedComponent =>
  class HOC extends React.Component {
    static displayName = `HOC${PackagedComponent.displayName || PackagedComponent.name || 'Component'}`
    
    render() {
      return (
        <div id="HOCWrapper">
          <header>
            <h1>{componentTitle ? componentTitle : '默认标题'}</h1>
          </header>
          <PackagedComponent/>
        </div>
      )
    }
}

@HOCComponent('个人中心-1')
export default class Main extends React.Component {
    render() {
        return(
            <p>main content</p>
        )
    }
}