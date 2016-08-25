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
import { StyleSheet } from 'react-look'

class Login extends React.Component{

    constructor (props, context) {
        super(props, context);
    }

    responseFacebook (response) {
        console.log(response);
        //anything else you want to do(save to localStorage)...
    }

    render () {
        return (
            <div >
                <FacebookLogin socialId="1648042272179054"
                               language="en_US"
                               scope="public_profile,email"
                               responseHandler={this.responseFacebook}
                               xfbml={true}
                               version="v2.5"
                               class= "facebook-login"
                               buttonText="Log in with Facebook"/>
            </div>
        );
    }

}



export default Login;
