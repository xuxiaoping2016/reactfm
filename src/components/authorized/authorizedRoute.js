import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Authorized from './authorized';

export default function AuthorizedRoute(props) {
  const {
    component: Component,
    render,
    authority,
    redirectPath,
    onUnMatched,
    ...rest
  } = props;

  return (
    <Authorized
      authority={authority}
      onUnMatched={onUnMatched}
      noMatch={
        <Route
          {...rest}
          render={() => <Redirect to={{ pathname: redirectPath }} />}
        />
      }
    >
      <Route
        {...rest}
        render={props => (Component ? <Component {...props} /> : render(props))}
      />
    </Authorized>
  );
}
