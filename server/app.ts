import config from './config';
import configDevApp from './app.dev';
import configProdApp from './app.prod';
import express from 'express';

const isProd = process.env.NODE_ENV === 'production';

const app = express();

isProd ? configProdApp(app) : configDevApp(app);

app.listen(config.port, function () {
  console.log('server is running at port 3020');
});
