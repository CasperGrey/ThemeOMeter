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

      fetch('/api/themes/total',{
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({
            theme_id: this.state.currentTheme,
      })
    })
      .then(response => response.json())
      .then(entries => {
          this.setState({entries})
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
        entries={this.state.themes}
    />
}

export default Container
