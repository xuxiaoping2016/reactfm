import React, { Component} from 'react';

function Child(props) {
    return (
      <div>
        <input ref={props.inputRef} />
      </div>
    );
}
  
class Parent extends Component {
    componentDidMount() {
      if (this.textInputRef) this.textInputRef.focus();
    }
    render() {
      return (
        <div>
            <p>demo 3 通过回调函数的形式将ref传递给子组件中的DOM中</p>
            <Child inputRef={el => this.textInputRef = el} />
        </div>
      );
    }
}

export default Parent;