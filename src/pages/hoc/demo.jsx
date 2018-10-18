import React, {Component} from 'react';
import withHeader from './withHeader'


@withHeader({
  tit:'自定义标题'
})
export default class Demo extends Component {
  static defaultProps = {
    name:"mingzi",
    age:"38"
  }
  render() {
    return (
      <div>
        我是一个普通组件
      </div>
    );
  }
}
