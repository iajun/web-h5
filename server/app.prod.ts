// Copyright 2020 9AM Software. All rights reserved.
// Distribution of this file is strictly prohibited.

import { resolveFromDist } from './paths';
import express, { Application } from 'express';
import render from './render';
// eslint-disable-next-line @typescript-eslint/no-var-requires

export default function setAppEnv(app: Application) {
  app.use(express.static(resolveFromDist('.')));
  return void app.use(render());
}
