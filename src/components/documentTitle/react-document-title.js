"use strict";

var React = require("react"),
  PropTypes = require("prop-types");
// withSideEffect = require('./react-side-effects').default;
import withSideEffect from "./react-side-effect";
/**
 * 获取最后一个props对象，返回这个对象的title属性；
 * @param {Array} propsList props集合
 */
function reducePropsToState(propsList) {
  var innermostProps = propsList[propsList.length - 1];
  if (innermostProps) {
    return innermostProps.title;
  }
  // return propsList.reduceRight((cur,next) => {
  //   return cur + '-' + next.title
  // },'')
}
// 比较接受到的title与现有title是否相等，不等则设置title；
function handleStateChangeOnClient(title) {
  var nextTitle = title || "";
  console.log("handleStateChangeOnClient", nextTitle);
  if (nextTitle !== document.title) {
    document.title = nextTitle;
  }
}

function DocumentTitle() {}
DocumentTitle.prototype = Object.create(React.Component.prototype);

DocumentTitle.displayName = "DocumentTitle";
DocumentTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

DocumentTitle.prototype.render = function () {
  if (this.props.children) {
    return React.Children.only(this.props.children);
  } else {
    return null;
  }
};

export default withSideEffect(
  reducePropsToState,
  handleStateChangeOnClient
)(DocumentTitle);
