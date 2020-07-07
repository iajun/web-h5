// Copyright 2020 9AM Software. All rights reserved.
// Distribution of this file is strictly prohibited.

/// <reference types="webpack-env" />

import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './App';
import createStore from './store';

const createApp = (Component: typeof Root) => {
  const initialState = window.__INITIAL_STATE__;
  const store = createStore(initialState);

  const App = () => {
    return (
      <Provider store={store}>
        <Router>
          <Component />
        </Router>
      </Provider>
    );
  };
  return <App />;
};

loadableReady().then(() => {
  ReactDOM.hydrate(createApp(Root), document.getElementById('app'));
});

// 热更新
if (module.hot) {
  module.hot.accept('./App', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const NewApp = require('./App').default;
    ReactDOM.hydrate(createApp(NewApp), document.getElementById('app'));
  });
}
