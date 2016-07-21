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
import s from './Footer.css';
import Link from '../Link';

class Footer extends Component {

  render() {
    return (
      <div className={"root"}>
        <div className={"container"}>
          <span className={"text"}>© TheGreySpace</span>
          <span className={"spacer"}>·</span>
          <Link className={"link"} to="/">Home</Link>
          <span className={"spacer"}>·</span>
          <Link className={"link"} to="/privacy">Privacy</Link>
          <span className={"spacer"}>·</span>
          <Link className={"link"} to="/not-found">Reports</Link>
        </div>
      </div>
    );
  }

}

export default withStyles(s)(Footer)
