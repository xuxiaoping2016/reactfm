import React from 'react';
let {Provider, Consumer} = React.createContext()
// 父组件
function Parent (props) {
    return (
        <div>
            <div>Parent: </div>
           <Son></Son>
        </div>
    )
}
// 子组件
function Son (props) {
    return (
        <div>
            <div>Son: </div>
            <Child></Child>
        </div>

    )
}
// 孙子组件
function Child (props) {
    return (
        <Consumer>
            {value => <div>
                value: {value}
            </div>}
        </Consumer>
    )
}