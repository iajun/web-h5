// Copyright 2020 9AM Software. All rights reserved.
// Distribution of this file is strictly prohibited.

interface ClientConfig {
  auth: {
    null: noAuth;
    user: userAuth;
  };
}

const config: ClientConfig = {
  auth: {
    null: 0,
    user: 1,
  },
};

export default config;
