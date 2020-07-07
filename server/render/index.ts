import { MANIFEST_PATH, SERVERBUNDLE_PATH } from '../paths';
import { Request, RequestHandler } from 'express';
import { getExtractedData, getExtractor } from './data';
import { getFileData, readFile } from '../util/readFile';
import { matchRoutes } from 'react-router-config';
import { parseTemplate } from './template';
import { resolveFromPublic } from '../paths';
import ReactDom from 'react-dom/server';
import config from '../config';
import fs from 'fs';
import requireFromString from 'require-from-string';

const defaultTemplatePath = resolveFromPublic(config.templates.index);

interface RenderOptions {
  template: string;
  clientManifest: Record<string, string>;
  serverbundle: string;
}

export interface Render {
  (options?: RenderOptions): RequestHandler;
}

/**
 * normalize options in case of it is lacked or invalid
 *
 * @param {options}
 * @returns: options
 */
function normalizeOptions(options?: RenderOptions): RenderOptions {
  let newOptions: RenderOptions;

  try {
    newOptions = {
      template: options?.template || defaultTemplatePath,
      clientManifest: options?.clientManifest || JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf-8')),
      serverbundle: options?.serverbundle || fs.readFileSync(SERVERBUNDLE_PATH, 'utf-8'),
    };
  } catch (e) {
    throw new Error(
      'You should build your project first in production mode, or pass client manifest and server bundle to make it work!',
    );
  }

  return newOptions;
}

async function renderToString(req: Request, options?: RenderOptions) {
  const { clientManifest, serverbundle, template } = normalizeOptions(options);

  // path -> relpath
  const extraFiles: Record<keyof typeof config.assets, string> = {};
  Object.keys(config.assets).forEach((key) => {
    extraFiles[key] = resolveFromPublic(config.assets[key]);
  });

  // run serverbundle
  const { createApp, routes, createStore } = requireFromString(serverbundle);

  // get async store data
  const store = createStore();
  const promises = matchRoutes(routes, req.url).map((route) => {
    if (route.route.asyncData) {
      route.route.asyncData(store, route.match.params);
      return store.rootTask.toPromise();
    } else {
      return Promise.resolve(null);
    }
  });
  await Promise.all(promises);

  const extractor = getExtractor(clientManifest, ['app']);

  const context: Record<string, unknown> = {};

  const app = extractor.collectChunks(createApp(context, req.url, store));

  // rendertostring must be before extracting tags, or cause error
  const appString = ReactDom.renderToString(app);

  if (context.statusCode) {
    return Promise.reject(context);
  }

  // extracted data like link tags, script tags, styles etc
  const extractedData = getExtractedData(extractor);

  // customed file data like other css, js files
  const extraData = await getFileData(extraFiles);

  const parseData = {
    ...extractedData,
    ...extraData,
    app: appString,
    state: `window.__INITIAL_STATE__ = ${JSON.stringify(store.getState())}`,
  };

  const html = await parseTemplate(template, parseData, {
    minify: process.env.NODE_ENV === 'production',
  });

  return html;
}

/**
 * render middileware
 *
 * options contains: template to be rendered, manifest to be read, serverbundle to run
 * if you don't parse options, it will use default files from client dist path
 *
 * @param {object} options template, serverbundle, clientmanifest
 * @returns {string} htmlstring
 */
const render: Render = (options) => async (req, res) => {
  let html;
  try {
    html = await renderToString(req, options);
  } catch (error) {
    if (error.statusCode && error.statusCode === 404) {
      res.status(404);
      html = await readFile(resolveFromPublic(config.templates['404']));
    } else {
      res.status(500);
      html = await readFile(resolveFromPublic(config.templates['500']));
    }
  }

  res.send(html);
};

export default render;
