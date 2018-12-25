import React from 'react';
import ReactDom from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'mobx-react';
// import store from 'store/store.js'
import store from 'store'
import history from 'utils/history';
import App from './components/App/App.jsx';
import '../mock/mock';

if (module.hot) {
    module.hot.accept();
}

ReactDom.render(
    <AppContainer>
        <Provider {...store}>
            <App  />
        </Provider>
    </AppContainer>, 
    document.getElementById('app')
);