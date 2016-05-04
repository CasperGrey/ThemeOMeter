import gaze from 'gaze'
import cp from 'child_process'
import path from 'path' 
import fs from 'fs'
import chalk from 'chalk'
import copyFile from './copyFile.js'
import WebpackDevServer from 'webpack-dev-server'
import webpack from 'webpack'
import webpackConfig from './../webpack.config.js'
var babel = require("babel-core");

copyFile('tools/dev-template.html', 'public/index.html')
runWebpackDevServer()  
startServer()

/**
 * Starts the server and watches for file changes, restarts the process when
 * files are changed.
 */
function startServer(){
  const entryFile = path.join(__dirname, '../lib/server.js')
  var watcher = new gaze.Gaze('src/**/*');
  var server = spawnServerProcess()

  // A file has been added/changed/deleted has occurred 
  watcher.on('all', function(event, filepath) { 
    try {
      transpileFile(filepath)
    } catch (err){
      console.log(toErrorStack(err))
      console.log(chalk.red(`File does not compile, waiting for changes...`))
      return
    }
    // Restart server
    console.log(chalk.red(`Restarting server...`))
    server.kill('SIGTERM');
    server = spawnServerProcess();
  });

  function toErrorStack(err) {
    if (err._babel && err instanceof SyntaxError) {
      return `${err.name}: ${formatPathInErrorMessage(err.message)}\n${err.codeFrame}`;
    } else {
      return err.stack;
    }

    function formatPathInErrorMessage(message){
      var pathEndIndex = message.indexOf(":")
      var messagePath = message.slice(0, pathEndIndex)
      var relativePath = path.relative(__dirname, messagePath)
      // Remove the ../ as this file is nested in tools
      return relativePath.slice(3) + message.slice(pathEndIndex)
    }
  }

  function transpileFile(filepath){
    var relativeSrcPath = path.relative(__dirname, filepath)
    console.log(chalk.red(`Transpiling ${relativeSrcPath.slice(3)}`))
    var relativeLibPath = relativeSrcPath.replace("src", "lib")
    // Rebuild the changed file
    var { map, code } = babel.transformFileSync(filepath, {
      sourceMaps: true,
    })
    //console.log(require('util').inspect(code))
    var libFilePath = path.resolve(__dirname, relativeLibPath)
    fs.writeFileSync(libFilePath, code, 'utf8')
    fs.writeFileSync(libFilePath + `.map`, map, 'utf8')
  }

  function spawnServerProcess() {
    const server = cp.fork(entryFile, {
      env: Object.assign({ NODE_ENV: 'development' }, process.env),
      silent: false,
    });
    process.on('exit', () => server.kill('SIGTERM'));
    return server;
  }
}




function runWebpackDevServer(){

  var config = Object.assign({}, webpackConfig)
  config.entry.push("webpack/hot/dev-server")
  config.entry.push("webpack-dev-server/client?http://localhost:8080/")
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
  config.devtool = 'source-map'
  var compiler = webpack(webpackConfig);

  var server = new WebpackDevServer(compiler, {
    // webpack-dev-server options

    contentBase: path.resolve(__dirname, '../src'),
    // or: contentBase: "http://localhost/",

    hot: true,
    // Enable special support for Hot Module Replacement
    // Page is no longer updated, but a "webpackHotUpdate" message is send to the content
    // Use "webpack/hot/dev-server" as additional module in your entry point
    // Note: this does _not_ add the `HotModuleReplacementPlugin` like the CLI option does. 

    // Set this as true if you want to access dev server from arbitrary url.
    // This is handy if you are using a html5 router.
    historyApiFallback: false,

    // Set this if you want to enable gzip compression for assets
    compress: true,

    // webpack-dev-middleware options
    quiet: false,
    noInfo: false,
    //lazy: true,
    //filename: "bundle.js",
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    //publicPath: "/",
    headers: { "X-Custom-Header": "yes" },
    stats: { 
      colors: true,
      // This means in the output window it will only show the chunk
      // which changed
      cached: false, 
    }
  });
  server.listen(8080, "localhost", function() {
    console.log('webpack dev server running on port 8080')
  });
}
