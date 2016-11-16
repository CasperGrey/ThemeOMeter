require("babel-polyfill")
Error.stackTraceLimit = 25
import express from 'express'
import path from 'path'
import { fetchNeeds, AsyncRouterContext } from 'redux-async-props'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match } from 'react-router'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers/index.js'
import routes from './modules/routes.js'
import fs from 'fs'
import { Presets, StyleSheet, LookRoot } from 'react-look'
import StylesAndThemeProvider from './StylesAndThemeProvider.jsx'

const templateHtml = fs.readFileSync(path.resolve(__dirname, 'public', 'index.html'), 'utf8')
const serverConfig = Presets['react-dom']
const PORT = process.env.PORT || 5000

var server = express()

server.get('*', function(req, res, next) {
  match({ routes, location: req.url }, (err, redirect, props) => {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirect) {
      return res.redirect(302, redirect.pathname + redirect.search)
    } else if (!props) {
      return next()
    }

    serverConfig.userAgent = req.headers['user-agent']
    serverConfig.styleElementId = '_look'

    const css = []; // CSS for all rendered React components

    const store = createStore(reducer)
    fetchNeeds(props, store)
    .then((asyncProps) => {
      const appHtml = renderToString(
        <StylesAndThemeProvider insertCss={(styles) => {
          if (typeof styles == 'function')
            throw new Error('did you get your withStyles parameters the wrong way around?')
          css.push(styles._getCss())
        }}>
          <Provider store={store}>
            <LookRoot config={serverConfig}>
              <AsyncRouterContext {...props} asyncProps={asyncProps} />
            </LookRoot>
          </Provider>
        </StylesAndThemeProvider>
      )
      var html = templateHtml
      html = html.replace('<!--__APP_HTML__-->', appHtml)
      const appCSS = StyleSheet.renderToString(serverConfig.prefixer)
      html = html.replace('<!-- {{css}} -->', appCSS)
      const initialState = {asyncProps, store: store.getState()}
      html = html.replace('<!-- {{styleLoaderCss}} -->', css.join(''))
      html = html.replace('{/*__INITIAL_STATE__*/}', JSON.stringify(initialState))
      res.send(html)
    })
    .catch(next)
  })
})
server.use(express.static(path.resolve(__dirname, 'public')))
server.use(express.static(path.resolve(__dirname, '..', 'src', 'public')))
console.log(path.resolve(__dirname, '..', 'src', 'public'))
// apply the routes to our application
server.use('/api/themes', require('./api/theme.js'))
server.use('/api/songs', require('./api/songs.js'));
server.use('/api/score', require('./api/score.js'));
server.use('/api/user', require('./api/user.js'));
server.use('/api/reports', require('./api/reports.js'));

server.listen(PORT, () => console.log(`Server listening on port ${PORT}!`))
