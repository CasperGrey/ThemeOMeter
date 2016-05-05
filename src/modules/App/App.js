import React, { Component } from 'react'
import { Link } from 'react-router'
import { StyleSheet } from 'react-look'
import Background from './Background/Background.jsx'

require('./AppStyles.js')

const styles = StyleSheet.create({
  AppInner: {
    padding: '50px 60px',
  }
})


export default class App extends Component {
  render() {
    return <div>
      <Background />
      <div className={styles.AppInner}>
      	<h2>Works</h2>
        {/*
      	<h5>A simple async props example.</h5>

      

        {this.props.children}*/}
      </div>
    </div>
  }
} 