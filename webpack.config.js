const path = require("path")

module.exports = {
  entry: './src/index.js', 
  mode: "development",
  devtool: "source-map",
  module: {
    rules: [
      {
        exclude: [
          /node_modules/
        ],
        loader: 'babel-loader',
        options: {
                    presets: [
                      '@babel/preset-env',
                      {
                        'plugins': ['@babel/plugin-proposal-class-properties']
                      }]
                 }
      }
    ]
  }
}
