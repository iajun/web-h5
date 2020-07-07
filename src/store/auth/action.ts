// Copyright 2020 9AM Software. All rights reserved.
// Distribution of this file is strictly prohibited.

import { ActionType, createAsyncAction } from 'typesafe-actions';

interface AuthRequestPayload {
  username: string;
  password: string;
}

interface AuthSuccessPayload {
  auth: Auth;
}

const AuthAsync = createAsyncAction('AUTH_REQUEST', 'AUTH_SUCCESS', 'AUTH_FAILURE', 'AUTH_CANCEL')<
  AuthRequestPayload,
  AuthSuccessPayload,
  Error,
  string
>();

export default AuthAsync;

export type AuthActionType = ActionType<typeof AuthAsync>;
