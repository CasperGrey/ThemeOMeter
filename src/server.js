require("babel-polyfill")

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

const templateHtml = fs.readFileSync('./public/index.html', 'utf8')
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
    const store = createStore(reducer)
    fetchNeeds(props, store)
    .then((asyncProps) => {
      const appHtml = renderToString(
        <Provider store={store}>
          <AsyncRouterContext {...props} asyncProps={asyncProps} />
        </Provider>
      )
      var html = templateHtml
      html = html.replace('<!--__APP_HTML__-->', appHtml)
      const initialState = {asyncProps, store: store.getState()}
      html = html.replace('{/*__INITIAL_STATE__*/}', JSON.stringify(initialState))
      res.send(html)
    })
  })
})
server.use(express.static(path.join(__dirname, '..', 'public')))

server.listen(PORT, () => console.log(`Server listening on port ${PORT}!`))