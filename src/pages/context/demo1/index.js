import React from 'react';
let {Provider, Consumer} = React.createContext('fdf')
// 父组件
function Parent (props) {
    return (
        <Provider value="传值">
            <div>Parent: </div>
           <Son></Son>
        </Provider>
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
// 孙组件
function Child (props) {
    return (
        <Consumer>
            {value => <div>
                value: {value}
            </div>}
        </Consumer>
    )
}

export default Parent;