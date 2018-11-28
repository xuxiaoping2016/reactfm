import React, { Component } from "react";
import {Button} from 'antd'

export default class Theme extends React.Component {
    render() {
      return <Toolbar name="提交" />;
    }
  }
  
  function Toolbar(props) {
    //为了让子组件能获取必要的参数，这里需要使用props.theme继续向子组件传递参数，
    //但是实际上theme参数对于Toolbal组件来说并没有任何价值。
    //例如项目全局设置了一个theme参数来控制很多组件的主题样式，
    //那么这个参数需要在几乎所有的组件出现，并且不断的传递他
    return (
      <div>
        <ThemedButton name={props.name} />
      </div>
    );
  }
  
  function ThemedButton(props) {
    return <Button>{props.name}</Button>;
  }