// Copyright 2020 9AM Software. All rights reserved.
// Distribution of this file is strictly prohibited.

import { LoadableComponent } from '@loadable/component';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useTypedSelector } from '@/store/reducer';
import React, { FC, useCallback } from 'react';

interface PrivateRouteProps extends RouteProps {
  auth?: Auth;
  component: LoadableComponent<RouteProps>;
}

function isAuthed(shouldHave: Auth | undefined, current: Auth) {
  if (!shouldHave) return true;
  return shouldHave & current;
}

// page auth guard
const PrivateRoute: FC<PrivateRouteProps> = (props) => {
  const { component, auth: routeAuth, ...restProps } = props;
  const currentAuth = useTypedSelector((state) => state.auth);

  const render = useCallback(
    (props: RouteProps) =>
      isAuthed(routeAuth, currentAuth.auth) ? React.createElement(component, props) : <Redirect to="/login" />,
    [currentAuth, routeAuth, component],
  );

  return <Route render={render} {...restProps} />;
};

export default PrivateRoute;
