import React from 'react';
import ReactDom from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';
// import store from './redux/store.js'
import App from './components/App/App';
import '../mock/mock';

// if (module.hot) {
//     module.hot.accept();
// }

ReactDom.render(
    <App/>,
    // <AppContainer>
    //     <Provider store={store}>
    //         <App/>
    //     </Provider>
    // </AppContainer>, 
    document.getElementById('app')
);