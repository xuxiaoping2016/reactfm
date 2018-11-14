import React from 'react';
import ReactDom from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';
import store from 'store/store.js'
import getRouter from 'router/router'


if (module.hot) {
    module.hot.accept();
}

ReactDom.render(
    <AppContainer>
        <Provider store={store}>
            {getRouter()}
        </Provider>
    </AppContainer>, 
    document.getElementById('app')
);