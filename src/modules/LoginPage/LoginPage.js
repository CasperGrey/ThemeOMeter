/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import FacebookLogin from './FacebookLogin';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './LoginPage.css';
import { StyleSheet } from 'react-look'
import { dispatch } from 'redux'

function loginAction(user) {
    return {
        type: 'LOGIN',
        user: user
    }
}
class Login extends React.Component{

    constructor (props, context) {
        super(props, context);
    }

    render () {
        return (
            <div >
                <FacebookLogin socialId="1648042272179054"
                               language="en_US"
                               scope="public_profile,email"
                               responseHandler={this.props.onLogin}
                               xfbml={true}
                               version="v2.5"
                               class= "facebooklogin"
                               buttonText= "Login with Facebook"/>
            </div>
        );
    }

}

Login.propTypes = {
    onLogin: React.PropTypes.func.isRequired
};


// export default Login;
export default withStyles(s)(Login);
