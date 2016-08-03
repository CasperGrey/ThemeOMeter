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
import s from './LoginPage.css';

const FBSDK = require('react-native-fbsdk');
const {
    LoginButton,
} = FBSDK;

var Login = React.createClass({
  render: function() {
    return (
        <View>
          <LoginButton
              publishPermissions={["publish_actions"]}
              onLoginFinished={
                (error, result) => {
                  if (error) {
                    alert("Login failed with error: " + result.error);
                  } else if (result.isCancelled) {
                    alert("Login was cancelled");
                  } else {
                    alert("Login was successful with permissions: " + result.grantedPermissions)
                  }
                }
              }
              onLogoutFinished={() => alert("User logged out")}/>
        </View>
    );
  }
});