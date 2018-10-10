import React from 'react';
import ReactDom from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'mobx-react';
import AppStore from './store/AppStore'

const storebox = new AppStore();

import getRouter from 'router/router'

/*初始化*/
renderWithHotReload(getRouter());

/*热更新*/
if (module.hot) {
    module.hot.accept('./router/router', () => {
        const getRouter = require('./router/router').default;
        renderWithHotReload(getRouter());
    });
}

function renderWithHotReload(RootElement) {
    ReactDom.render(
        <AppContainer>
            <Provider storebox = {storebox}>
                {RootElement}
            </Provider>
        </AppContainer>,
        document.getElementById('app')
    )
}



// if (module.hot) {
//     module.hot.accept();
// }

// ReactDom.render(
//     getRouter(), document.getElementById('app'));