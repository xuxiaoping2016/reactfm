### 代码示例

```javascript
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { loadComponents, renderRoutes } from './utils/lazyRouteUtils';

const Loading = () => <div>loading</div>;
const NotFound = () => <div>not found</div>;

const routeConfig = [
  {
    path: '/:pid/app',
    loader: () => import('./pages/ABCLayout'),
    routes: [
      {
        path: '/:pid/app',
        redirect: '/:pid/app/A',
      },
      {
        path: '/:pid/app/A',
        loader: () => import('./pages/A'),
      },
      {
        path: '/:pid/app/B',
        loader: () => import('./pages/B'),
      },
      {
        path: '/:pid/app/C',
        loader: () => import('./pages/C'),
      },
      {
        redirect: '/notfound',
      },
    ],
  },
  {
    path: '/D',
    loader: () => import('./pages/D'),
  },
  {
    path: '/notfound',
    component: NotFound,
  },
  {
    path: '*',
    component: NotFound,
  },
];

const routes = loadComponents({ routeConfig, loading: Loading });
const history = createBrowserHistory();

function App() {
  return <Router history={history}>{renderRoutes(routes)}</Router>;
}

ReactDOM.render(<App />, document.getElementById('root'));
```
