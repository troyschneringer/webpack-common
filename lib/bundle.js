const webpack = require('webpack');

module.exports.extractBundle = function(name, entries) {
  const entry = {};
  entry[name] = entries;

  return {
    // Define an entry point needed for splitting.
    entry: entry,
    plugins: [
      // Extract bundle and manifest files. Manifest is
      // needed for reliable caching.
      new webpack.optimize.CommonsChunkPlugin({
        names: [name, 'manifest']
      })
    ]
  };
}

module.exports.chunkhash = function(path) {
  return {
    devtool: 'source-map',
    output: {
      path: path,
      filename: '[name].[chunkhash].js',
      // This is used for require.ensure. The setup
      // will work without but this is useful to set.
      chunkFilename: '[chunkhash].js'
    }
  };
}