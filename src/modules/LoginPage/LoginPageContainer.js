/**
 * Created by jason on 5/10/16.
 */
import { connect } from 'react-redux'
import Login from './LoginPage'

const mapStateToProps = (state) => {
    console.log(state);
    return {
        user: state.user
    }
}

function loginAction(user) {
    return {
        type: 'LOGIN',
        user: user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (response) => {

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
                    sessionStorage.setItem('userId', response.agent_id)
                    this.setState({userId: response.agent_id})
                    dispatch(loginAction(response.agent_id))

                })

        }
    }
}

const LoginContainer = connect(
    mapStateToProps
)(Login)

export default LoginContainer