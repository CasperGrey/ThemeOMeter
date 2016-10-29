import React, { Component } from 'react'
import SummaryPage from './SummaryPage.js'

class Container extends Component {

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

      fetch('/api/themes/all')
      .then(response => response.json())
      .then(themes => {
          this.setState({themes})
      })
  }


    onSave = (songs) => {

    };

    state = {};

    render = () => <SummaryPage
        {...this.props}
        songs={this.state.songs}
        currentTheme={this.state.currentTheme}
        onSave={this.onSave}
        themes={this.state.themes}
    />
}

export default Container
