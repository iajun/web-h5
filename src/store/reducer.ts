// Copyright 2020 9AM Software. All rights reserved.
// Distribution of this file is strictly prohibited.

import { ActionFromReducersMapObject, combineReducers } from 'redux';
import { END } from 'redux-saga';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import authReducer from './auth/reducer';
import endReducer from './end/reducer';

const reducers = {
  auth: authReducer,
  end: endReducer,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;

export type AppState = ReturnType<typeof rootReducer>;

export type AppAction = ActionFromReducersMapObject<typeof reducers> | END;

export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector;
