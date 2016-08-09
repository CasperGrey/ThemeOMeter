import React, { Component, PropTypes } from 'react'
import Header from '../Header';
import Footer from '../Footer';

export default class App extends Component {

  render() {
    return !this.props.error ? (
        <div>
          <Header />
          {this.props.children}
          <Footer />
        </div>
    ) : this.props.children;
  }
}
