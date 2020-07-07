function generateScriptLoaders(options) {
  const babelLoader = {
    loader: 'babel-loader',
    options: {
      caller: {
        target: options.target,
      },
    },
  };

  const tsLoader = {
    loader: 'awesome-typescript-loader',
    options: {
      configFileName: 'src/tsconfig.json'
    }
  }

  return [
    [/\.js$/, [babelLoader, 'eslint-loader']],
    [/\.(ts|tsx)$/, [babelLoader, tsLoader, 'eslint-loader']],
  ].map(([test, use]) => ({ test, use, exclude: /node_modules/ }));
}

module.exports = generateScriptLoaders;
