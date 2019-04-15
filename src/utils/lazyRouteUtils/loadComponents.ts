import { ComponentType, ComponentClass } from 'react';
import { RouteProps } from 'react-router-dom';
import lazyLoad, { TImporter } from './lazyLoad';

export type TLazyRouteComponentProps = RouteProps & { route: TLazyOutputRoute };
export type TLazyRouteComponentType = ComponentClass<TLazyRouteComponentProps>;

interface TLazyInputRouteBase {
  strict?: boolean;
  sensitive?: boolean;
  exact?: boolean;
  routes?: TLazyInputRoute[];
}

type TLazyInputRouteWithComponent = TLazyInputRouteBase & {
  path: string;
  component?: ComponentType<any> | TLazyRouteComponentType;
  Route?: ComponentType;
};

type TLazyInputRouteWithLoader = TLazyInputRouteBase & {
  path: string;
  loader: TImporter;
  loading?: ComponentType;
  Route?: ComponentType;
};

type TLazyInputRouteWithRedirect = TLazyInputRouteBase & {
  path?: string;
  redirect: string;
};

export type TLazyInputRoute =
  | TLazyInputRouteWithComponent
  | TLazyInputRouteWithLoader
  | TLazyInputRouteWithRedirect;

type TLazyInputRouteFull = TLazyInputRouteWithComponent &
  TLazyInputRouteWithLoader &
  TLazyInputRouteWithRedirect;

export interface TLazyOutputRoute {
  path?: string;
  component?: TLazyRouteComponentType;
  redirect?: string;
  routes?: TLazyOutputRoute[];
  Route?: ComponentType;
  strict?: boolean;
  sensitive?: boolean;
  exact?: boolean;
}

export interface TLoadComponentsOptions {
  routesConfig: TLazyInputRoute[];
  loading: ComponentType;
  root?: string;
}

export default function loadComponents(
  options: TLoadComponentsOptions
): TLazyOutputRoute[] {
  const { routesConfig, loading: defaultLoading, root = '' } = options;
  function recurse(routesData: TLazyInputRoute[] | TLazyInputRoute) {
    let routesResult: TLazyOutputRoute | TLazyOutputRoute[];
    if (Array.isArray(routesData)) {
      routesResult = routesData.map(recurse);
    } else {
      const {
        routes,
        loader,
        loading,
        component,
        path,
        redirect,
        ...rest
      } = routesData as TLazyInputRouteFull;
      routesResult = rest;
      if (path) {
        routesResult.path = root + path;
      }
      if (redirect) {
        routesResult.redirect = root + redirect;
      }
      if (component) {
        const c = component as TLazyRouteComponentType;
        routesResult.component = c;
      } else if (loader) {
        routesResult.component = lazyLoad<TLazyRouteComponentProps>(
          loader,
          defaultLoading || loading
        );
      }
      if (routes) {
        routesResult.routes = recurse(routes);
      }
    }
    return routesResult;
  }
  return recurse(routesConfig);
}
