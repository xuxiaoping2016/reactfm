import qs from 'qs';
import pathToRegexp from 'path-to-regexp';
import history from './history';
import {
  loadComponents,
  TLazyOutputRoute,
  TLoadComponentsOptions,
} from './lazyRouteUtils';
import { tranverse } from './treeTransform';
import { getPid, getStoreId } from './env';

interface TObject {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;
}
type TEnhancedPathFn = (params?: TObject, query?: TObject) => string;
type TNavigateMethodName = 'push' | 'replace';
interface TNavigateOptions {
  params?: TObject;
  query?: TObject;
  state?: TObject;
}

const publicParams = { pid: getPid(), storeId: getStoreId() };

function getPathAlias(fullPath: string, root: string = ''): string {
  return fullPath
    .replace(root, '')
    .slice(1)
    .replace(/\/:[a-z0-9_\-?]+/gi, '')
    .replace(/(\/[a-z])/g, s => s[1].toUpperCase());
}

function injectParams(str: string, params: TObject): string {
  return str.replace(/:([a-z0-9_]+)/gi, (s, $1) => params[$1] || `:${$1}`);
}

function enhancePath(path: string): TEnhancedPathFn {
  const publicPath = injectParams(path, publicParams);
  const fillPath = pathToRegexp.compile(publicPath);
  return function enhancedPath(params = {}, query = {}) {
    return fillPath(params) + qs.stringify(query, { addQueryPrefix: true });
  };
}

class Navigator {
  public paths: { [prop: string]: TEnhancedPathFn } = {};

  public replace = (pathAlias: string, options?: TNavigateOptions) => {
    return this.navigateTo(pathAlias, options, 'replace');
  };

  public push = (pathAlias: string, options?: TNavigateOptions) => {
    return this.navigateTo(pathAlias, options, 'push');
  };

  private navigateTo(
    pathAlias: string,
    options: TNavigateOptions = {},
    navigateType: TNavigateMethodName = 'push'
  ) {
    const { params = {}, query = {}, state } = options;
    const enhancedPath = this.paths[pathAlias];
    const navigateMethod = history[navigateType];
    if (enhancedPath) {
      const path = enhancedPath(params, query);
      return navigateMethod(path, state);
    }
    console.warn(`${pathAlias}没有注册`);
    return null;
  }

  public loadRoutes(options: TLoadComponentsOptions): TLazyOutputRoute[] {
    const { root } = options;
    const routes = loadComponents(options);
    tranverse(routes, { children: 'routes' })(route => {
      const { path } = route as TLazyOutputRoute;
      if (path) {
        const enhancedPath = enhancePath(path);
        this.paths[getPathAlias(path, root)] = enhancedPath;
        this.paths[path.replace(root || '', '')] = enhancedPath;
      }
    });
    return routes;
  }
}

export const marketNavigateOpen = path => {
  window.open(
    `/#/app/${getPid()}/${getStoreId()}/retail/selection${path}`,
    '_blank'
  );
};

export const supplierNavigator = new Navigator();
export const marketNavigator = new Navigator();

export default supplierNavigator;
