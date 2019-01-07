import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

const textCount = WrappedComponent =>
  class Inners extends Component {
    componentDidMount(){
      console.log("textCount",this.props)
    }
    // enteredCharacters = () => {
    //   const { maxLength, ignore, value } = this.props;

    //   let extent = 0;
    //   const v = value || '';
    //   if (!ignore) {
    //     const ret = v.match(/[\u4e00-\u9fa5]+/g) || [];
    //     const l = ret.join('').length; // 中文字符个数
    //     extent = l + Math.ceil((v.length - l) / 2);
    //   } else {
    //     extent = v.length;
    //   }

    //   const len = extent < maxLength ? extent : maxLength;
    //   return len;
    // };

    // onChange = e => {
    //   const { maxLength, ignore, onChange } = this.props;
    //   const v = typeof e === 'string' ? e : e.target.value;
    //   const originl = v.length;
    //   let len = 0;
    //   const ret = [];

    //   if (!ignore) {
    //     for (let i = 0; i < originl; i++) {
    //       len += /[\u4e00-\u9fa5]/.test(v[i]) ? 1 : 0.5;

    //       if (len > maxLength) {
    //         break;
    //       } else {
    //         ret.push(v[i]);
    //       }
    //     }
    //   } else {
    //     len = originl <= maxLength ? originl : maxLength;
    //   }
    //   const val = !ignore ? ret.join('') : v.slice(0, len);
    //   onChange(val);
    // };

    render() {
      const { onChange, ignore, ...restProps } = this.props;
      restProps.onChange = this.onChange;
      restProps.enteredCharacters = this.enteredCharacters;
      console.log(restProps, '....,,....');
      return <WrappedComponent {...restProps} />;
    }
  };

export default textCount;

/* 
* 本控件仅限于ant.design Form 中使用
* @property {number} maxLength 可选 默认值200  最多输入字符个数 
* @property {number} ignore  可选 默认值false 是否区不分中文与非中文，进行无差别计数
                              false 差别计数 中文算1个字符，非中文算0.5个字符，
                              true 不区分  中文与非中文 都算1个字符
* @property {function} onChange  textarea值改变后的回调函数
*/

/* 
<FormItem>
  {getFieldDecorator('key', {
    initialValue: key,
  })(<TextareaCount maxLength={20} />)}
</FormItem>
*/
