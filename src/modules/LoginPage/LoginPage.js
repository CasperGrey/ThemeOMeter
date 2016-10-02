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
        debugger
        fetch('/api/user', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: response.name,
                accessToken: response.accessToken,
              })
            })
            .then(response => response.json())
            .then(response => {
              sessionStorage.setItem('userId', response.agent_id)
              
            })
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
                               class= "facebooklogin"
                               buttonText= "Login"/>
            </div>
        );
    }

}



export default Login;
