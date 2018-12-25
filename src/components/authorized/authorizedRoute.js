import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Authorized from './authorized';

export default function AuthorizedRoute(props) {
  const {
    component: Component,
    render,
    authority,
    redirectPath,
    onReject,
    ...rest
  } = props;

  return (
    <Authorized
      authority={authority}
      onReject={onReject}
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
