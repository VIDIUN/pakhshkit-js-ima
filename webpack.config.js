'use strict';

const webpack = require('webpack');
const path = require('path');
const PROD = process.env.NODE_ENV === 'production';
const packageData = require('./package.json');

let plugins = [
  new webpack.DefinePlugin({
    __VERSION__: JSON.stringify(packageData.version),
    __NAME__: JSON.stringify(packageData.name)
  })
];

if (PROD) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({sourceMap: true}));
}

module.exports = {
  context: __dirname + '/src',
  entry: {'pakhshkit-ima': 'index.js'},
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
    library: ['VidiunPlayer', 'plugins', 'ima'],
    libraryTarget: 'umd',
    umdNamedDefine: true,
    devtoolModuleFilenameTemplate: './ima/[resource-path]'
  },
  devtool: 'source-map',
  plugins: plugins,
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ],
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        exclude: [/node_modules/]
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        enforce: 'pre',
        use: [
          {
            loader: 'eslint-loader',
            options: {
              rules: {
                semi: 0
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: __dirname + '/src'
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  externals: {
    '@pakhshkit-js/pakhshkit-js': {
      commonjs: '@pakhshkit-js/pakhshkit-js',
      commonjs2: '@pakhshkit-js/pakhshkit-js',
      amd: 'pakhshkit-js',
      root: ['VidiunPlayer', 'core']
    }
  }
};
