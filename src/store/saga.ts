// Copyright 2020 9AM Software. All rights reserved.
// Distribution of this file is strictly prohibited.

import { all, fork } from 'redux-saga/effects';
import watchLogin from './auth/saga';

function* rootSaga() {
  yield all([fork(watchLogin)]);
}

export default rootSaga;
