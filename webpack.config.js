const PATH = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',

  watch: true,

  entry: [
    './frontend/main.js',
    //  "./frontend/style.scss"
  ],

  output: {
    path: PATH.resolve(__dirname, 'frontend/dist'),

    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,

        include: [PATH.resolve(__dirname, 'frontend')],

        exclude: [PATH.resolve(__dirname, 'node_modules')],
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              ['@babel/plugin-proposal-private-methods', { loose: true }],
            ],
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                },
              ],
            ],
          },
        },
      },

      {
        test: /\.ejs$/,

        use: [
          {
            loader: 'ejs-loader?',

            options: {
              variable: 'data',
              // esModule : true ,
              // interpolate : '\\{\\{(.+?)\\}\\}',
              // evaluate : '\\[\\[(.+?)\\]\\]'
            },
          },
        ],
      },

      {
        test: /\.(sa|sc|c)ss$/,

        use: [
          // {
          //     loader : "file-loader" ,

          //     options : {
          //         name : "style.bundle.css"
          //     }
          // },

          // {
          //     loader : "extract-loader"
          // },
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader?-url',
          },

          {
            loader: 'postcss-loader',
          },

          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },

  /**
   * this webpack plugin beacuse You also should
   * provide a global _ variable with the lodash/underscore runtime.
   * read documentation in npm ejs loader
   */
  plugins: [
    new webpack.ProvidePlugin({
      _: 'underscore',
    }),
  ],
};
