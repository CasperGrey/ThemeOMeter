import React, { Component } from 'react'
import { Link } from 'react-router'
import Header from '../Header';

export default class App extends Component {
  render() {
    return <div>
      <Header />
      <h1>Router Test Page</h1>

      <h5>A simple async props example.</h5>

      <ul role="nav">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/entry">Entry</Link></li>
        <li><Link to="/score">Scoring</Link></li>
      </ul>

      {this.props.children}

    </div>
  }
}