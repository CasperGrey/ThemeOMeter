import React, { Component } from 'react'
import SongEntryPage from './SongEntryPage.js'
import parseTitleString from './../PlayerSongList/parseTitleString'
import TextField from 'material-ui/TextField'
import { browserHistory } from 'react-router'
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
        fetch('/api/themes/current')
        .then(response => response.json())
        .then(json => {
            this.setState({
                currentTheme: json.name
            })
        })
    }

    state = {
        successMessage: "",
    };

    onSave = (videoItems) => {
      if(videoItems.length < 5){
          alert("Sorry you must choose at least 5 songs")
        }
        else {

            var userId = this.props.userId

            videoItems.forEach(video => {
                var songInfo = parseTitleString(video.snippet.title)

                fetch('/api/songs', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        songName: songInfo.title,
                        user_id : userId,
                        artistName: songInfo.artist,
                        comment: video.comment,
                        songURL: `https://youtu.be/${video.id.videoId}`,
                        videoId: video.id.videoId,
                    })
                })
            })
            this.setState({successMessage: "Save Succesful"})
            setTimeout(function() {browserHistory.push('/score')}, 2000);

        }
    };



    state = {};

    render = () => <SongEntryPage
        {...this.props}
        currentTheme={this.state.currentTheme}
        onSave={this.onSave}
        successMessage = {this.state.successMessage}
    />
}



export default Container
