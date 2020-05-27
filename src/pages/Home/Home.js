import React, { Component } from "react";
import Co from "./Components";
import { Link } from 'react-router-dom'
// import './style.css'
// import './style.scss'

import im from "../../images/wait.png";
var imgUrl = '/images/wait.png'
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

	_handleClick() {
		this.setState({
			count: ++this.state.count,
    });
  }

	render() {
		let eles = ["abcd", "abcd", "abcd", "abcd"];
		const f = () => <div>123457function</div>;
    return (
      <div className="container">
        <p className="scss">测试scss 样式文件!!!!!!!!!!</p>
        <img src={im} />
        <img src={imgUrl} />
        this is home~~fdfkd
        <br />
        当前计数：{this.state.count}
        <br />
        <button onClick={() => this._handleClick()}>自增</button>
        <Co>
          <div>rrere</div>
          <div>123456789</div>
        </Co>
        <Link to="/nestedRouter">测试嵌套路由</Link>
        {this.props.children}
      </div>
    );
  }
}
