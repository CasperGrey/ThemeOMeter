/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import Link from '../Link';
import Navigation from '../Navigation';

class Header extends Component {

  render() {
    return (
      <div className="root">
        <div className="container">
          <Navigation className="nav" />
          <Link className="brand" to="/">
            <img src={require('./logo-small.png')} width="38" height="38" alt="React" />
            <span className="brandTxt">Themeo</span>
          </Link>
          <div className="banner">
            <h1 className="bannerTitle">TEST</h1>
            <p className="bannerDesc">Score to the death</p>
          </div>
        </div>
      </div>
    );
  }

}

export default withStyles(s)(Header)
