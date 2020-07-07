import { Application } from 'express';
import render from './render';
import ssr from './middleware/ssr';
import webpack, { Configuration, Entry } from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const clientConfig: Configuration = require('../config/webpack.config.client.js');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const serverConfig: Configuration = require('../config/webpack.config.server.js');

function entryIsEntry(entry: any): entry is Entry {
  if (!entry) return false;
  return Object.prototype.toString.call(clientConfig.entry) === '[object Object]';
}

type ClientEntry = {
  app: string[];
};

function entryHasAppArrayKey(entry: Entry): entry is ClientEntry {
  return Array.isArray(entry.app) && entry.app.every((e) => typeof e === 'string');
}

export default function setAppEnv(app: Application) {
  if (!clientConfig.plugins) {
    clientConfig.plugins = [];
  }

  if (!entryIsEntry(clientConfig.entry) || !entryHasAppArrayKey(clientConfig.entry)) {
    throw new TypeError('entry is invalid');
  }

  clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  clientConfig.entry.app.push('webpack-hot-middleware/client');

  const multiCompiler = webpack([clientConfig, serverConfig]);
  const [clientCompiler] = multiCompiler.compilers;

  app.use(
    webpackDevMiddleware(multiCompiler, {
      publicPath: '/',
      logLevel: 'error',
    }),
  );
  app.use(webpackHotMiddleware(clientCompiler));

  app.use(
    ssr({
      render,
      multiCompiler,
    }),
  );
}
