interface ServerConfiguare {
  assets: Record<string, string>;
  templates: Record<string, string>;
  port: number;
}

const config: ServerConfiguare = {
  assets: {
    'normalize.css': 'css/normalize.css',
  },
  templates: {
    index: 'html/index.html',
    '404': 'html/404.html',
    '500': 'html/500.html',
  },
  port: 3020,
};

export default config;
