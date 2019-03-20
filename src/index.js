import React from 'react';
import ReactDom from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';
import store from 'store/store.js'
import App from './components/App/App.jsx';
import history from './utils/history'
import '../mock/mock';

if (module.hot) {
    module.hot.accept();
}

history.listen((location, action) => {
    console.log(location)
    console.log(action, location.pathname, location.state);
});
  

ReactDom.render(
    <AppContainer>
        <Provider store={store}>
            <App  history={history}/>
        </Provider>
    </AppContainer>, 
    document.getElementById('app')
);