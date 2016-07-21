var path = require('path')

const webpackConfig = {
  entry: [
    path.join(__dirname, 'src/app.js'),
  ],
  output: {
    path: path.resolve(__dirname, "dist", "public"),
    publicPath: "http://localhost:8000/",
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
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=image/svg+xml" },
      /*{
        test: /\.scss$/,
        loaders: [
          'style',
          `css-loader?${JSON.stringify({ sourceMap: true, minimize: false })}`,
          'postcss-loader?pack=sass',
          'sass-loader',
        ],
      },*/
      { test: /\.css$/, loader: "isomorphic-style-loader!css-loader" },
    ],
  },
}

module.exports = webpackConfig