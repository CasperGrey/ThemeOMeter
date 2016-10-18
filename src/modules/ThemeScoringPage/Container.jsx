import React, { Component } from 'react'
import ThemeScoringPage from './ThemeScoringPage.js'
import { browserHistory } from 'react-router'
import update from 'react-addons-update';

class Container extends Component {

    componentDidMount = () => {
      debugger
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

        var currentsong = songs[index]
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
                        theme_id: currentsong.theme_id,
                        user_id: userid,
                        song_id: currentsong.song_id,
                        score: currentsong.score,
                        song_comment: currentsong.comment,
                    })
                })
                debugger
          //TODO: Remove song from songs to be scored once a score has been saved
           this.setState({
             songs: update(this.state.songs, {$splice: [[index, 1]]})
           })
           if(songs.length < 1){
           setTimeout(function() {browserHistory.push('/summary')}, 2000);
           }
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
