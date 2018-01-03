const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack/dev.config');
const options = {
  contentBase: config.output.publicPath,
  hot: true,
  host: '0.0.0.0',
  disableHostCheck: true,
  historyApiFallback: true,
};

WebpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new WebpackDevServer(compiler, options);

server.listen(
  3001,
  options.host,
  (err, result) => {
    if (err) {
      return console.log(err);
    }

    console.log('Listening at http://0.0.0.0:3001/');
    return true;
  }
);
