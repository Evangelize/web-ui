require('babel-polyfill');

// Webpack config for development
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const helpers = require('./helpers');

const assetsPath = path.resolve(__dirname, '../static/dist');
const host = 'localhost';
const port = 3002;
const ReactLoadablePlugin = require('react-loadable/webpack').ReactLoadablePlugin;
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const babelrc = fs.readFileSync('./.babelrc');
const packageDeps = require('../package.json');
let babelrcObject = {};

try {
  babelrcObject = JSON.parse(babelrc);
} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.');
  console.error(err);
}

const babelrcObjectDevelopment = babelrcObject.env && babelrcObject.env.development || {};

// merge global and dev-only plugins
let combinedPlugins = babelrcObject.plugins || [];
combinedPlugins = combinedPlugins.concat(babelrcObjectDevelopment.plugins);

let babelLoaderQuery = Object.assign({}, babelrcObject, babelrcObjectDevelopment, { plugins: combinedPlugins });
delete babelLoaderQuery.env;

const validDLLs = helpers.isValidDLLs('vendor', assetsPath);
if (process.env.WEBPACK_DLLS === '1' && !validDLLs) {
  process.env.WEBPACK_DLLS = '0';
  console.warn('webpack dlls disabled');
}

const webpackConfig = module.exports = {
  devtool: 'inline-source-map',
  context: path.resolve(__dirname, '..'),
  target: 'web',
  entry: {
    main: [
      'react-hot-loader/patch',
      'babel-polyfill',
      './src/index.js',
    ],
  },
  output: {
    path: assetsPath,
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: '/',
  },
  performance: {
    hints: false,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'happypack/loader?id=jsx',
        exclude: /(react-pure-render)/,
        include: [
          path.resolve(__dirname, '../src'),
          path.resolve(__dirname, '../node_modules'),
        ],
      },
      {
        test: /\.json$/,
        loader: 'happypack/loader?id=json',
        include: [
          path.resolve(__dirname, '../src'),
          path.resolve(__dirname, '../node_modules'),
        ],
      },
      {
        test: /\.css$/,
        loader: 'happypack/loader?id=css',
        include: [
          path.resolve(__dirname, '../src'),
          path.resolve(__dirname, '../node_modules'),
        ],
      },
      {
        test: /\.less$/,
        loader: 'happypack/loader?id=less',
        include: [
          path.resolve(__dirname, '../src'),
          path.resolve(__dirname, '../node_modules'),
        ],
      },
      {
        test: /\.scss$/,
        loader: 'happypack/loader?id=sass',
        include: [
          path.resolve(__dirname, '../src'),
          path.resolve(__dirname, '../node_modules'),
        ],
      },
      {
        test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          mimetype: 'application/font-woff',
        },
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          mimetype: 'application/octet-stream',
        },
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          mimetype: 'image/svg+xml',
        },
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('images'),
        loader: 'url-loader',
        options: {
          limit: 10240,
        },
      },
    ],
  },
  resolve: {
    modules: [
      'src',
      'node_modules',
    ],
    extensions: ['.json', '.js', '.jsx'],
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.LoaderOptionsPlugin({
      test: /\.(less|scss|css)/,
      options: {
        postcss: function (webpack) {
          return [
            require('postcss-import')({ addDependencyTo: webpack }),
            require('postcss-url')(),
            require('postcss-cssnext')({ browsers: 'last 2 version' }),
            // add your "plugins" here
            // ...
            // and if you want to compress,
            // just use css-loader option that already use cssnano under the hood
            require('postcss-browser-reporter')(),
            require('postcss-reporter')(),
          ]
        },
      },
    }),
    new HtmlWebpackPlugin({ hash: false, template: './index.hbs' }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /nb/),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEV__: true,
      __DEVTOOLS__: true,
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        BROWSER: 1,
      },
      'typeof window': JSON.stringify('object'),
    }),
    new CopyWebpackPlugin([
      { from: 'src/css', to: 'css' },
      { from: 'src/images', to: 'images' },
      { from: 'node_modules/chartist/dist/chartist.min.js', to: 'css'},
    ]),
    webpackIsomorphicToolsPlugin.development(),

    new ReactLoadablePlugin({
      filename: path.join(assetsPath, 'loadable-chunks.json'),
    }),
    helpers.createHappyPlugin('json', [
      {
        loader: 'json-loader',
      },
    ]),
    helpers.createHappyPlugin('jsx', [
      {
        loader: 'babel-loader',
        options: babelLoaderQuery,
      },
    ]),
    helpers.createHappyPlugin('css', [
      {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 2,
          sourceMap: true,
          localIdentName: '[local]___[hash:base64:5]',
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
        },
      },
    ]),
    helpers.createHappyPlugin('less', [
      {
        loader: 'style-loader',
        options: { sourceMap: true },
      }, {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 2,
          sourceMap: true,
          localIdentName: '[local]___[hash:base64:5]',
        },
      }, {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
        },
      }, {
        loader: 'less-loader',
        options: {
          outputStyle: 'expanded',
          sourceMap: true,
        },
      },
    ]),
    helpers.createHappyPlugin('sass', [
      {
        loader: 'style-loader',
        options: { sourceMap: true },
      }, {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 2,
          localIdentName: '[local]___[hash:base64:5]',
        },
      }, {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
        },
      }, {
        loader: 'sass-loader',
        options: {
          outputStyle: 'expanded',
          sourceMap: true,
        },
      },
    ]),
    new LodashModuleReplacementPlugin({
      collections: true,
      currying: true,
      paths: true,
      shorthands: true,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'node-static',
      filename: 'node-static.js',
      minChunks(module, count) {
        const context = module.context;
        return context && context.indexOf('node_modules') >= 0;
      },
    }),
    //catch all - anything used in more than one place
    new webpack.optimize.CommonsChunkPlugin({
      async: 'used-twice',
      minChunks(module, count) {
        return count >= 2;
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new OfflinePlugin({
      publicPath: '/',
      externals: [
        '/',
      ],
      ServiceWorker: {
        navigateFallbackURL: '/',
      },
      AppCache: {
        FALLBACK: {
          '/': '/offline-page.html',
        },
      },
    }),
  ],
};

if (process.env.WEBPACK_DLLS === '1' && validDLLs) {
  helpers.installVendorDLL(webpackConfig, 'vendor');
}