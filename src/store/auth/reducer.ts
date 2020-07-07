// Copyright 2020 9AM Software. All rights reserved.
// Distribution of this file is strictly prohibited.

import { createReducer } from 'typesafe-actions';
import AuthAsync, { AuthActionType } from './action';
import config from '@/config';

type AuthStateType = {
  auth: Auth;
};

const initialState: AuthStateType = {
  auth: config.auth.user,
};

const loginReducer = createReducer<typeof initialState, AuthActionType>(initialState).handleAction(
  AuthAsync.success,
  (state, action) => ({
    ...state,
    auth: config.auth.user,
    other: action.payload,
  }),
);

export default loginReducer;
