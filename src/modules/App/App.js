import React, { Component, PropTypes } from 'react'
import jss from 'jss'
import preset from 'jss-preset-default'
import camelCase from 'jss-camel-case'

jss.setup(preset())
//import Header from '../Header';
//import Footer from '../Footer';

const {classes} = jss.createStyleSheet({

  html: {
    padding: 0,
    margin: 0,
  },
  body: {
   padding: 0,
   margin: 0,
   fontFamily: "Helvetica, Arial, sans-serif",
   fontSize: 13,
   WebkitFontSmoothing: 'antialiased',
 },
 root: {
   margin: '0 auto',
 },

 appBackground: {
     backgroundColor: 'whitesmoke',
 },

}).attach()


export default class App extends Component {

  render() {
    return !this.props.error ? (
        <div className = {classes.appBackground}>
          {this.props.children}
        </div>
    ) : this.props.children;
  }
}
