// Copyright 2020 9AM Software. All rights reserved.
// Distribution of this file is strictly prohibited.

import { Route } from 'react-router-dom';
import React, { FC } from 'react';

type Code = 404 | 403;

interface StatusRouteProps {
  code: Code;
}

const StatusRoute: FC<StatusRouteProps> = (props) => (
  <Route
    render={({ staticContext }) => {
      // 客户端无staticContext对象
      if (staticContext) {
        // 设置状态码
        staticContext.statusCode = props.code;
      }
      return props.children;
    }}
  />
);

export default StatusRoute;
