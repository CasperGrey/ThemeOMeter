import React, { Component } from 'react'

const styles = StyleSheet.create({
  Navigation: {
    backgroundColor: 'black',
    color: '#ffffff',
    fontFamily: '"Courier New", Courier, monospace',
    fontSize: '0.875rem',
    fontWeight: 500,
  }
})

class Navigation extends Component {
	render = () => <ul role="nav">
    <li><Link to="/">Home</Link></li>
    <li><Link to="/cats">About</Link></li>
    <li><Link to="/dogs">Images</Link></li>
    <li><Link to="/dogs">Press</Link></li>
    <li><Link to="/dogs">Contact</Link></li>
  </ul>

}