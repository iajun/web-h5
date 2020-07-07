// Copyright 2020 9AM Software. All rights reserved.
// Distribution of this file is strictly prohibited.

import { AppAction as _StoreAction, AppState as _StoreState } from '@store/reducer';
import { compose } from 'redux';

declare global {
  type AppState = _StoreState;
  type AppAction = _StoreAction;

  type noAuth = 0;
  type userAuth = 1;
  type Auth = noAuth | userAuth;

  interface Window {
    __INITIAL_STATE__: AppState;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
