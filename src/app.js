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

const rememberEverything = store => next => action => {
    const state = store.getState();
    sessionStorage.setItem('THEMEO', JSON.stringify(state));
    next(action);
    return state
};

const storedState = JSON.parse(
    sessionStorage.getItem('THEMEO')
);
console.log(storedState)
//...
const initialState = window.__INITIAL_STATE__
const store = createStore(
    reducer,
    storedState || {login:{user:null}},
    applyMiddleware(
        thunk,
        rememberEverything
    )
);


render((
  <Provider store={store}>
    <StylesAndThemeProvider insertCss={(styles) => css.push(styles._getCss())}>
      <Router
        routes={routes}
        history={browserHistory}
        render={(props) => <AsyncRouterContext
          {...props}
          asyncProps={initialState.asyncProps}
        />}
      />
    </StylesAndThemeProvider>
  </Provider>
), document.getElementById('app'))
