import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import emptyFunction from 'fbjs/lib/emptyFunction';
import s from './App.js'
import Header from '../Header';
import Footer from '../Footer';
import Content from '../ContentPage';

export default class App extends Component {

  render() {
    return !this.props.error ? (
        <div>
          <Header />
          <Content />
          {this.props.children}
          <Footer />
        </div>
    ) : this.props.children;
  }
}
