const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('merge');
const validate = require('webpack-validator');
const wpmerge = require('webpack-merge');

const bundle = require('./bundle');
const clean = require('./clean');
const css = require('./css');
const dev = require('./dev');
const optimize = require('./optimize');

const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

var defaultOptions = {
  paths: {
    app: path.join(__dirname, '../../../app'),
    build: path.join(__dirname, '../../../build'),
    style: path.join(__dirname, '../../../app', 'main.css'),
  },
  title: "Webpack Application"
}

function config(options) {
  
  options = merge(defaultOptions, options || {});

  const common = {
    // Entry accepts a path or an object of entries.
    // We'll be using the latter form given it's
    // convenient with more complex configurations.
    entry: {
      style: options.paths.style,
      app: options.paths.app
    },
    output: {
      path: options.paths.build,
      filename: '[name].js'
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          // Enable caching for improved performance during development
          // It uses default OS directory by default. If you need
          // something more custom, pass a path to it.
          // I.e., babel?cacheDirectory=<path>
          loaders: ['babel?cacheDirectory'],
          // Parse only app files! Without this it will go through
          // the entire project. In addition to being slow,
          // that will most likely result in an error.
          include: options.paths.app
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: options.title
      })
    ],
    // Important! Do not remove ''. If you do, imports without
    // an extension won't work anymore!
    resolve: {
      extensions: ['', '.js', '.jsx']
    }
  };

  var config;

  switch(TARGET) {
    case 'build':
      config = wpmerge(
        common,
        {
          devtool: 'source-map',
          output: {
            path: options.paths.build,
            filename: '[name].[chunkhash].js',
            // This is used for require.ensure. The setup
            // will work without but this is useful to set.
            chunkFilename: '[chunkhash].js'
          }
        },
        clean.clean(options.paths.build),
        optimize.setFreeVariable(
          'process.env.NODE_ENV',
          'production'
        ),
        bundle.extractBundle({
          name: 'vendor',
          entries: ['react']
        }),
        optimize.minify(),
        css.extractCss(options.paths.style)
      );
      break;
    default:
      config = wpmerge(
        common,
        {
          devtool: 'source-map'
        },
        css.setupCss(options.paths.style),
        dev.devServer({
          // Customize host/port here if needed
          host: process.env.HOST,
          port: process.env.PORT
        })
      );
  }

  return validate(config);
}

module.exports = config;