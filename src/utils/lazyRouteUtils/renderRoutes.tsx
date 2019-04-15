import React, { ReactElement } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { TLazyOutputRoute } from './loadComponents';

function renderRoutes(routes?: TLazyOutputRoute[]): ReactElement | null {
  return routes ? (
    <Switch>
      {routes.map(route => {
        if (route.redirect) {
          return (
            <Redirect
              key={route.redirect}
              from={route.path}
              to={route.redirect}
              exact
              strict={route.strict}
            />
          );
        }
        const RealRoute = route.Route || Route;
        return (
          <RealRoute
            key={route.path}
            path={route.path}
            strict={route.strict}
            sensitive={route.sensitive}
            exact={route.exact}
            render={props => {
              const childRoutes = renderRoutes(route.routes);
              const RouteComponent = route.component;
              if (RouteComponent) {
                // for parent route layout
                return childRoutes ? (
                  <RouteComponent {...props} route={route}>
                    {childRoutes}
                  </RouteComponent>
                ) : (
                  <RouteComponent {...props} route={route} />
                );
              }
              return childRoutes;
            }}
          />
        );
      })}
    </Switch>
  ) : null;
}

export default renderRoutes;
