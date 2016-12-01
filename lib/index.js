const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('merge');
const validate = require('webpack-validator');
const wpmerge = require('webpack-merge');

const bundle = require('./bundle');
const clean = require('./clean');
const common = require('./common');
const css = require('./css');
const dev = require('./dev');
const optimize = require('./optimize');

module.exports.chunkhash = bundle.chunkhash;
module.exports.clean = clean.clean;
module.exports.common = common.common;
module.exports.devServer = dev.devServer;
module.exports.extractBundle = bundle.extractBundle;
module.exports.extractCss = css.extractCss;
module.exports.minify = optimize.minify;
module.exports.setFreeVariable = optimize.setFreeVariable;
module.exports.setupCss = css.setupCss;
module.exports.sourcemaps = css.sourcemaps;