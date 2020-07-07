// Copyright 2020 9AM Software. All rights reserved.
// Distribution of this file is strictly prohibited.

import { call, fork, put, take } from 'redux-saga/effects';
import AuthAsync from './action';

function fakeFunc() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        auth: 1,
        stored: true,
      });
    }, 300);
  });
}

function* loginSaga(action: ReturnType<typeof AuthAsync.request>) {
  try {
    const res = yield call(fakeFunc);
    yield put(AuthAsync.success(res));
  } catch (error) {
    yield put(AuthAsync.failure(error));
  }
}

function* watchLogin() {
  while (true) {
    const action = yield take(AuthAsync.request);
    yield fork(loginSaga, action);
  }
}

export default watchLogin;
