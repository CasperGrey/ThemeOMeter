/**
 * Created by jason on 5/10/16.
 */
import { connect } from 'react-redux'
import Login from './LoginPage'
import Router from 'react-router'

const mapStateToProps = (state) => {
    console.log('login state', state);
    return {
        user: state.login.user
    }
};

function loginAction(user) {
    return {

        type: 'LOGIN',
        user: user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: () => {
            dispatch(loginAction(1))
        },
        onLogin: (response) => {
            dispatch(loginAction(1));
            console.log(response);
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
                    console.log('api/user - json: ', response)
                    dispatch(loginAction(response.agent_id))
                })
        }
    }
};

const LoginContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

export default LoginContainer
