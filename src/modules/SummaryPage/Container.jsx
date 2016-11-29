import React, { Component } from 'react'
import SummaryPage from './SummaryPage.js'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {

    var userId = null
    if (state.login && state.login.user)
        userId = state.login.user
    return {
        userId,
    }
}

class Container extends Component {

  static propTypes = {
      /**
       * The user id
       */
      userId: React.PropTypes.number,
  };

  componentDidMount = () => {
      fetch('/api/songs/by-theme')
      .then(response => response.json())
      .then(songs => {
          this.setState({songs})
      })

      fetch('/api/themes/current')
      .then(response => response.json())
      .then(json => {
          this.setState({
              currentTheme: json.name
          })
      })

      fetch('/api/themes/currentProgress')
      .then(response => response.json())
      .then(json => {
          this.setState({
              currentProgress: json.name
          })
      })

      var userId = this.props.userId
      fetch('/api/reports/userscore',{
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({
            user_id: userId
      })
    })
      .then(response => response.json())
      .then(userscores => {
          this.setState({userscores})
          console.log(this.state.userscores)
      })

      fetch('/api/reports/userscoring',{
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({
            user_id: userId
      })
    })
      .then(response => response.json())
      .then(userscoring => {
          this.setState({userscoring})
          console.log(this.state.userscoring)
      })


  }






    state = {};

    render = () => <SummaryPage
        {...this.props}
        songs={this.state.songs}
        currentTheme={this.state.currentTheme}
        onSave={this.onSave}
        themes={this.state.themes}
        userscores={this.state.userscores}
        userscoring={this.state.userscoring}
        currentProgress={this.state.currentProgress}
    />
}

export default connect(mapStateToProps)(Container)
