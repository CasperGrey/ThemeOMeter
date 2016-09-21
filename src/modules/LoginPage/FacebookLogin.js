import React from 'react';
import RaisedButton from 'material-ui/RaisedButton'
import { StyleSheet } from 'react-look'

export default class FacebookLogin extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        (function (d, s, id) {
            const element = d.getElementsByTagName(s)[0];
            const fjs = element;
            let js = element;
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = '//connect.facebook.net/en_US/sdk.js';
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        window.fbAsyncInit = () => {
            FB.init({
                appId: this.props.socialId,
                xfbml: this.props.xfbml,
                cookie: this.props.cookie,
                version: this.props.version,
            });
        };
    }

    responseApi (authResponse) {Lkjh1212
        FB.api('/me', { fields: this.props.fields }, (me) => {
            me.accessToken = authResponse.accessToken;
            this.props.responseHandler(me);
            sessionStorage.setItem('auth', facebookResponseObject);
        });
    };

    checkLoginState (response) {
        if (response.authResponse) {
            this.responseApi(response.authResponse);
        } else {
            if (this.props.responseHandler) {
                this.props.responseHandler({ status: response.status });
            }
        }
    };

    clickHandler () {
        FB.login(this.checkLoginState.bind(this), { scope: this.props.scope });
    };

    render() {
        return (
            <div>
                <RaisedButton className={`${this.props.class} ${styles['facebooklogin']}`} onClick={this.clickHandler.bind(this)} style={styles.facebooklogin}>
                    {this.props.buttonText}
                </RaisedButton>
            </div>
        );
    }
}
const styles = StyleSheet.create({

    facebooklogin: {
        color:'blue',
    },

})
