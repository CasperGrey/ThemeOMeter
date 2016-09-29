import React, { Component } from 'react'
import ThemeScoringPage from './ThemeScoringPage.js'
import { browserHistory } from 'react-router'

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

    }

    onSave = (songs,index) => {
        debugger
        // TODO: create check to make sure song hasnt been scored before
        if(songs.length < 1){
        setTimeout(function() {browserHistory.push('/home')}, 2000);
        console.log("Returning to home")
        }
        else {
          var userid = JSON.parse(sessionStorage.getItem('userId'));
                fetch('/api/score', {
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
          //TODO: Remove song from songs to be scored once a score has been saved
           this.setState({
             songs: update(this.state.songs, {$splice: [[index, 1]]})
           })
        }
  };

    state = {};

    render = () => <ThemeScoringPage
        {...this.props}
        songs={this.state.songs}
        currentTheme={this.state.currentTheme}
        onSave={this.onSave}
    />
}

export default Container
