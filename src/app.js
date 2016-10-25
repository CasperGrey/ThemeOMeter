require("babel-polyfill")
import { AsyncRouterContext } from 'redux-async-props'
import { createStore, applyMiddleware }  from 'redux';
import reducer from './reducers/index'
import { render } from 'react-dom'
import React from 'react'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import routes from './modules/routes.js'
import injectTapEventPlugin from "react-tap-event-plugin"
import StylesAndThemeProvider from './StylesAndThemeProvider.jsx'
import thunk from 'redux-thunk'
injectTapEventPlugin();

// TODO: Dunno what I'm supposed to do with this css on the client
const css = []; // CSS for all rendered React components

const sessionState = sessionStorage.getItem('THEMEO')

// Window initial state has login.user = 'x' which probably isn't correct?
// so not going to use it for now

//const initialState = sessionState ? JSON.parse(sessionState) : window.__INITIAL_STATE__
const initialState = sessionState ? JSON.parse(sessionState) : null
const store = createStore(
    reducer,
    initialState || {login:{user:null}},
    applyMiddleware(
      thunk
    )
);
// For debugging in the console, can do store.getState()
global.store = store

store.subscribe(() => {
  const state = store.getState()
  sessionStorage.setItem('THEMEO', JSON.stringify(state))
})


render((
  <Provider store={store}>
    <StylesAndThemeProvider insertCss={(styles) => css.push(styles._getCss())}>
      <Router
        routes={routes}
        history={browserHistory}
        render={(props) => <AsyncRouterContext
          {...props}
          // This isn't configured properly so removing it for now
          //asyncProps={initialState.asyncProps}
        />}
      />
    </StylesAndThemeProvider>
  </Provider>
), document.getElementById('app'))
