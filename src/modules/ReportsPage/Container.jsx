import React, { Component } from 'react'
import AdminPage from './AdminPage.js'

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
        debugger
        // TODO: create check to make sure song hasnt been scored before
        if(songs.length < 1){
         console.log("Invalid Vote")
        }
        else {
          var userid = JSON.parse(sessionStorage.getItem('userId'));
                fetch('/api/theme', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        theme_id: songs.theme_id,
                        user_id: userid,
                        song_id: songs.song_id,
                        score: songs.score,
                        song_comment: songs.comment,
                    })
                })
                debugger
        }
    };

    state = {};

    render = () => <AdminPage
        {...this.props}
        songs={this.state.songs}
        currentTheme={this.state.currentTheme}
        onSave={this.onSave}
        themes={this.state.themes}
    />
}

export default Container
