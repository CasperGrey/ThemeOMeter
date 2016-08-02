/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Navigation.css';
import {Link} from 'react-router';
import { StyleSheet } from 'react-look'

class Navigation extends Component {

  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    return (
      <div className={`${this.props.className}`} role="navigation">
        <Link className={styles.link} to="/entry">Entry</Link>
        <Link className={styles.link} to="/score">Score</Link>
        <span className={styles.spacer}> | </span>
        <Link className={styles.link} to="/login">Log in</Link>
        <span className={styles.spacer}>or</span>
      </div>
    );
  }

}

const styles = StyleSheet.create({

    link: {
    display: 'inline-block',
    padding: '3 8',
    textDecoration: 'none',
    fontSize: '18', /* ~18px */
},

    highlight: {
    marginRight: '8',
    marginLeft: '8',
    borderRadius: '3',
    backgroundColor: '0 0 0 .15',
    color: '#fff',
},

 spacer: {
    color: '255 255 255 .3',
}

})

export default withStyles(s)(Navigation);
