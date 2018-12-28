import React from 'react'

const HOCComponent = componentTitle => PackagedComponent =>
  class HOC extends React.Component {
    static displayName = `HOC${PackagedComponent.displayName || PackagedComponent.name || 'Component'}`
    
    // 回调方法，当被包装组件渲染完毕后，调用被包装组件的 changeColor 方法
    propc(wrapperComponentInstance) {
        console.log("wrapperComponentInstance", wrapperComponentInstance)
        wrapperComponentInstance.changeColor()
    }

    render() {
        // 改变 props，使用 ref 获取被包装组件的示例，以调用其中的方法
      const props = Object.assign({}, this.props, {ref: this.propc})
      return (
        <div id="HOCWrapper">
          <header>
            <h1>{componentTitle ? componentTitle : '默认标题'}</h1>
          </header>
          <PackagedComponent {...props}/>
        </div>
      )
    }
}

@HOCComponent('获取子组件并调用其方法')
export default class Main extends React.Component {
    changeColor() {
        console.log(666);
        document.getElementById('p').style.color = 'greenyellow'
    }

    render() {
        return(
            <div>
                <p id="p">获取子组件并调用其方法</p>
                <span>{ this.props.summary }</span>
            </div>
        )
    }
}