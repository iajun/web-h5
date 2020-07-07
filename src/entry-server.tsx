// Copyright 2020 9AM Software. All rights reserved.
// Distribution of this file is strictly prohibited.

import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { Store } from 'redux';
import { routes } from './router';
import React from 'react';
import Root from './App';
import createStore from '@/store';

const createApp = (context = {}, url: string, store: Store) => {
  const App = () => {
    return (
      <Provider store={store}>
        <StaticRouter context={context} location={url}>
          <Root />
        </StaticRouter>
      </Provider>
    );
  };
  return <App />;
};

export { createApp, createStore, routes };
