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
      },
      { test: /\.png$/, loader: "url-loader?limit=100000" },
      { test: /\.gif$/, loader: "url-loader?limit=100000" },
      { test: /\.jpg$/, loader: "file-loader" },
      // Needed for the css-loader for bootstrap.css
      // loads bootstrap's css.
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&mimetype=application/font-woff2" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=image/svg+xml" }
    ],
  }
}

module.exports = webpackConfig