## Path-to-RegExp使用说明

### 一、安装
npm install path-to-regexp --save

### 二、引用
**es6**

import pathToRegexp from 'path-to-regexp';

**commonjs**

const pathToRegexp = require('path-to-regexp')

### 三、使用
pathToRegexp(path, keys?, options?)
#### 参数说明
参数|说明|是否可选|默认值
---|:--:|:-------|---:
path| 字符串， 字符串数组或者一个常规表达式|必选|无
keys| 一个数组，用来填充path的键|可选|无
options|一个对象|可选|参见options配置说明

##### options配置说明
参数|说明|是否可选|默认值
---|:--:|:-------|---:
sensitive|值为true时 正则匹配大小写敏感 || false
strict| 是否允许一个可选的尾部分隔符去匹配 ||false
end | 是否匹配到字符串尾部|| true
start| 是否从字符串头部开始匹配 || true
delimiter| 片段的默认分隔符|| '/'
endsWith |大幅度 | |
whitelist |List of characters to consider delimiters when parsing.| | (default: undefined, any character)


**<font color=#00ffff>特别提示:</font>**  
path-to-regexp返回的RegExp用于有序数据（例如路径名，主机名）。 它无法处理任意排序的数据（例如查询字符串，URL片段，JSON等）  

path参数用于定义参数并填充键列表。

  
命名参数通过在参数名称前面添加冒号（：foo）来定义。 默认情况下，参数将匹配，直到下一个前缀（例如[^ /] +）。
