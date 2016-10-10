/**
 * Created by jason on 5/10/16.
 */
import { connect } from 'react-redux'
import ContentPage from './ContentPage'

const mapStateToProps = (state) => {
    console.log(state);
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

const ContentPageContainer = connect(
    mapStateToProps
)(ContentPage)

export default ContentPageContainer