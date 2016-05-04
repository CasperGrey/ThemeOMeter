var path = require('path')

const webpackConfig = {
  entry: [
    path.join(__dirname, 'src/app.js'),
  ],
  output: {
    path: path.resolve(__dirname, "public"),
    publicPath: "http://localhost:8080/",
    filename: "bundle.js"
  },
  plugins: [
    
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/, 
        loader: 'babel',
        exclude: /(node_modules|bower_components)/,
      }
    ],
  }
}

module.exports = webpackConfig