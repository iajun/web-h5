// Copyright 2020 9AM Software. All rights reserved.
// Distribution of this file is strictly prohibited.

import { PrivateRoute, StatusRoute, routes } from '@router/index';
import { Switch } from 'react-router-dom';
import React, { FC } from 'react';

const App: FC<Record<string, unknown>> = () => {
  return (
    <Switch>
      {routes.map((props) => (
        <PrivateRoute key={props.path} {...props} />
      ))}
      <StatusRoute code={404} />
    </Switch>
  );
};

export default App;
