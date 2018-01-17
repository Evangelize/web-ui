const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ReactLoadablePlugin = require('react-loadable/webpack').ReactLoadablePlugin;
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));
const OfflinePlugin = require('offline-plugin');
const helpers = require('./helpers');
const projectRootPath = path.resolve(__dirname, '../');
const assetsPath = path.resolve(projectRootPath, './static/dist');
const extractSass = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
  disable: process.env.NODE_ENV === 'development',
});
const babelrc = fs.readFileSync('./.babelrc');
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

module.exports = {
  devtool: 'source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    vendor: [
      'babel-polyfill',

      //
      // Generate this list using the following command against the stdout of
      // webpack running against the source bundle config (dev/prod.js):
      //
      //    webpack --config webpack/dev.config.js --display-modules | egrep -o 'babel-runtime/\S+' | sed 's/\.js$//' | sort | uniq

      // <babel-runtime>
      'babel-runtime/core-js/array/from',
      'babel-runtime/core-js/array/from.js',
      'babel-runtime/core-js/get-iterator',
      'babel-runtime/core-js/get-iterator.js',
      'babel-runtime/core-js/is-iterable',
      'babel-runtime/core-js/is-iterable.js',
      'babel-runtime/core-js/object/assign',
      'babel-runtime/core-js/object/assign.js',
      'babel-runtime/core-js/object/create',
      'babel-runtime/core-js/object/create.js',
      'babel-runtime/core-js/object/define-properties',
      'babel-runtime/core-js/object/define-properties.js',
      'babel-runtime/core-js/object/define-property',
      'babel-runtime/core-js/object/define-property.js',
      'babel-runtime/core-js/object/entries',
      'babel-runtime/core-js/object/entries.js',
      'babel-runtime/core-js/object/get-prototype-of',
      'babel-runtime/core-js/object/get-prototype-of.js',
      'babel-runtime/core-js/object/keys',
      'babel-runtime/core-js/object/keys.js',
      'babel-runtime/core-js/object/set-prototype-of',
      'babel-runtime/core-js/object/set-prototype-of.js',
      'babel-runtime/core-js/object/values',
      'babel-runtime/core-js/object/values.js',
      'babel-runtime/core-js/symbol',
      'babel-runtime/core-js/symbol/iterator',
      'babel-runtime/core-js/symbol/iterator.js',
      'babel-runtime/core-js/symbol.js',
      'babel-runtime/helpers/classCallCheck',
      'babel-runtime/helpers/classCallCheck.js',
      'babel-runtime/helpers/createClass',
      'babel-runtime/helpers/createClass.js',
      'babel-runtime/helpers/defineProperty',
      'babel-runtime/helpers/defineProperty.js',
      'babel-runtime/helpers/extends',
      'babel-runtime/helpers/extends.js',
      'babel-runtime/helpers/inherits',
      'babel-runtime/helpers/inherits.js',
      'babel-runtime/helpers/objectWithoutProperties',
      'babel-runtime/helpers/objectWithoutProperties.js',
      'babel-runtime/helpers/possibleConstructorReturn',
      'babel-runtime/helpers/possibleConstructorReturn.js',
      'babel-runtime/helpers/slicedToArray',
      'babel-runtime/helpers/slicedToArray.js',
      'babel-runtime/helpers/toArray',
      'babel-runtime/helpers/toArray.js',
      'babel-runtime/helpers/toConsumableArray',
      'babel-runtime/helpers/toConsumableArray.js',
      'babel-runtime/helpers/typeof',
      'babel-runtime/helpers/typeof.js',
      // </babel-runtime>

      'axios',
      'react',
      'material-ui',
      'react-dom',
      'react-hot-loader',
      'mobx-react',
      'react-router',
      'mobx',
    ],
    app: [
      'babel-polyfill',
      './src/index',
    ],
  },
  output: {
    path: assetsPath,
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'happypack/loader?id=jsx',
        include: [
          path.resolve(__dirname, '../src'),
          path.resolve(__dirname, '../node_modules/react-calendar-timeline'),
        ],
      }, {
        test: /\.json$/,
        loader: 'happypack/loader?id=json',
        include: [path.resolve(__dirname, '../src')],
      }, {
        test: /\.less$/,
        loader: 'happypack/loader?id=less',
        include: [path.resolve(__dirname, '../src')],
      }, {
        test: /\.scss$/,
        loader: 'happypack/loader?id=sass',
        include: [
          path.resolve(__dirname, '../src'),
          path.resolve(__dirname, '../node_modules/react-calendar-timeline'),
        ],
      }, {
        test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          mimetype: 'application/font-woff',
        },
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          mimetype: 'application/octet-stream',
        },
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          mimetype: 'image/svg+xml',
        },
      }, {
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
    extensions: ['.json', '.js', '.jsx']
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'src/css', to: 'css' },
      { from: 'src/images', to: 'images' },
      { from: 'node_modules/chartist/dist/chartist.min.js', to: 'css'},
    ]),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEV__: false,
      __DEVTOOLS__: false,
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        BROWSER: 1,
      },
      'typeof window': JSON.stringify('object'),
    }),
    new webpack.LoaderOptionsPlugin({
      test: /\.(less|scss)/,
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
    helpers.createHappyPlugin('jsx', [
      {
        loader: 'react-hot-loader/webpack',
      }, 
      {
        loader: 'babel-loader',
        options: babelLoaderQuery,
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
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),
    new UglifyJSPlugin({
      sourceMap: true,
      uglifyOptions: {
        ie8: false,
        compress: true,
      },
    }),
    new ReactLoadablePlugin({
      filename: path.join(assetsPath, 'loadable-chunks.json'),
    }),
    webpackIsomorphicToolsPlugin,
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
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
