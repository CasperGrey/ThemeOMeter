import React, { Component, PropTypes } from 'react'
import { StyleSheet } from 'react-look';
//import Header from '../Header';
//import Footer from '../Footer';

export default class App extends Component {

  render() {
    return !this.props.error ? (
        <div className = {styles.appBackground}>
          {this.props.children}
        </div>
    ) : this.props.children;
  }
}

const styles = StyleSheet.create({

    appBackground: {
        backgroundColor: 'whitesmoke',

    },

})
