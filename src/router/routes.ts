// Copyright 2020 9AM Software. All rights reserved.
// Distribution of this file is strictly prohibited.

import { ConfiguredStore } from '@store/index';
import { MatchedRoute } from 'react-router-config';
import AuthAsync from '@/store/auth/action';
import config from '@/config';
import loadable, { LoadableComponent } from '@loadable/component';

const { auth } = config;

interface IRoute {
  exact?: boolean;
  path: string;
  component: LoadableComponent<unknown>;
  asyncData?: (store: ConfiguredStore, route: MatchedRoute<null>) => void;
  auth?: Auth;
}

const routes: IRoute[] = [
  {
    path: '/',
    component: loadable(() => import('@page/Home')),
    exact: true,
    asyncData: async (store, route) => {
      store.dispatch(
        AuthAsync.request({
          username: 'd',
          password: 'dp',
        }),
      );
      store.closeSaga();
    },
    auth: auth.user,
  },
  {
    path: '/login',
    component: loadable(() => import('@page/Login')),
  },
];

export default routes;
