/**
 * Created by jason on 5/10/16.
 */
import { connect } from 'react-redux'
import ContentPage from './ContentPage'

const mapStateToProps = (state) => {
    return {
        login: state.login,
        user: state.login.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

const ContentPageContainer = connect(
    mapStateToProps
)(ContentPage);

export default ContentPageContainer