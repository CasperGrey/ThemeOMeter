/**
 * Created by jason on 5/10/16.
 */
import { connect } from 'react-redux'
import ContentPage from './ContentPage'

const mapStateToProps = (state) => {
    console.log('ContentPage State', state, state.login, state.login.user);
    return {
        login: state.login,
        user: state.login.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

const ContentPageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ContentPage);



export default ContentPageContainer