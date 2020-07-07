// Copyright 2020 9AM Software. All rights reserved.
// Distribution of this file is strictly prohibited.

import { END } from 'redux-saga';
import { Reducer } from 'redux';

const initialState = {
  ended: false,
};

const endReducer: Reducer<typeof initialState, typeof END> = (state = initialState, action) => {
  switch (action) {
    case END:
      return {
        ended: true,
      };

    default:
      return state;
  }
};

export default endReducer;
