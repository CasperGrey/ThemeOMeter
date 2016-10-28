import React, { Component } from 'react'
import ThemeScoringPage from './ThemeScoringPage.js'
import { browserHistory } from 'react-router'
import update from 'react-addons-update';
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



    static propTypes = {
        /**
         * The user id
         */
        userId: React.PropTypes.number,
    };

    onSave = (songs,index) => {

        var currentsong = songs[index]

        // TODO: create check to make sure song hasnt been scored before
        if(songs.length < 1){
        setTimeout(function() {browserHistory.push('/home')}, 2000);
        console.log("Returning to home")
        }
        else {
          var userId = this.props.userId
                fetch('/api/score', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        theme_id: currentsong.theme_id,
                        user_id: userId,
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
           songs.splice(index,1)
           if(songs.length < 1){
           setTimeout(function() {browserHistory.push('/summary')}, 1000);
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

export default connect(mapStateToProps)(Container)
