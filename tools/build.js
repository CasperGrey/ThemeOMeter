import copyFile from './copyFile.js'
import webpack from 'webpack'
import webpackConfig from './../webpack.config.js'

copyFile('tools/prod-template.html', 'public/index.html')
compileWebpackBundle()

function compileWebpackBundle(){
  var compiler = webpack(webpackConfig);
  compiler.run(function(err, stats) {
    if (err) throw err
    console.log(stats.toString())
  });
};