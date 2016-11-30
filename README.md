# webpack-cookbook

A common webpack configuration based on https://github.com/survivejs/webpack 1.3.3

## Installation

  `npm install webpack-cookbook --save-dev`

## Usage

Create a `.babelrc`

```
{
    "presets": [
        "latest",
        "react"
    ],
    "env": {
        "start": {
            "presets": [
                "react-hmre"
            ]
        }
    }
}
```

Create a `webpack.config.js`

```
const path = require('path');
const webpack = require('webpack-cookbook');

var options = {
    paths: {
      app: path.join(__dirname, 'app'),
      build: path.join(__dirname, 'build'),
      style: path.join(__dirname, 'app', 'main.css')
    },
    title: 'React Applicaiton'
};

module.exports = webpack.config(options);
```