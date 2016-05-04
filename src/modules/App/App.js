import React, { Component } from 'react'
import { Link } from 'react-router'
import { StyleSheet } from 'react-look'


const styles = StyleSheet.create({
  App: {
    backgroundColor: 'black',
    color: '#ffffff',
    fontFamily: '"Courier New", Courier, monospace',
    fontSize: '0.875rem',
    fontWeight: 500,
  }
})

export default class App extends Component {
  render() {
    return <div className={styles.App}>
    	<h1>Animals</h1>

    	<h5>A simple async props example.</h5>

    	

      {this.props.children}

    </div>
  }
} 