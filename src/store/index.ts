// Copyright 2020 9AM Software. All rights reserved.
// Distribution of this file is strictly prohibited.

import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import reducer from './reducer';
import rootSaga from './saga';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

function _createStore(state?: AppState) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(reducer, state, composeEnhancers(applyMiddleware(sagaMiddleware)));

  return {
    ...store,
    rootTask: sagaMiddleware.run(rootSaga),
    closeSaga: () => store.dispatch(END),
  };
}

export type ConfiguredStore = ReturnType<typeof _createStore>;

export default _createStore;
