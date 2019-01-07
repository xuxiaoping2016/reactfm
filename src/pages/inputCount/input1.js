import React, { Compoent } from 'react';

import { Input } from 'antd';
import texCount from './textCount'


class InputCounts extends Compoent {
  render() {
    const {
      onChange,
      placeholder,
      maxLength,
      enteredCharacters,
      ...restProps
    } = this.props;
    console.log(this.props, 'mmmm');
    return (<Input />
      // <Input
      //   // className={styles['input-wrap']}
      //   type="text"
      //   {...restProps}
      //   suffix={
      //     <span>
      //       {enteredCharacters()}/{maxLength}
      //     </span>
      //   }
      //   onChange={onChange}
      //   placeholder={placeholder || `请输入文字,字数不能超过${maxLength}个`}
      // />
    );
  }
}
export default texCount(InputCounts);
// export const TextareaCount = texCount(text);
