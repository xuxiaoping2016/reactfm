import React from './kkbreact1';
import ReactDom from './kkbreact-dom';
// import React from 'react';
// import ReactDom from 'react-dom';
// import ReactDom from '../others/react-dom.development2'
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';
import store from 'store/store.js'
import App from './components/App/App.jsx';
import '../mock/mock';

// if (module.hot) {
//     module.hot.accept();
// }

// ReactDom.render(
//     <AppContainer>
//         <Provider store={store}>
//             <App/>
//         </Provider>
//     </AppContainer>, 
//     document.getElementById('app')
// );

class Kkb extends React.Component{
    render(){
        return <div>开课吧真不错！！！{this.props.name}</div>
    }
}
function Kkb2(props){
    return <div>{props.name}</div>
}
ReactDom.render(
    <div id="kkb">
        改革春风吹满地！！！
        {/* <span id="kkb-span">123</span>
        <Kkb name="class组价"/>
        <Kkb2 name="函数式组件"><span>fdsfd</span></Kkb2>  */}
    </div>, 
    document.getElementById('app')
);