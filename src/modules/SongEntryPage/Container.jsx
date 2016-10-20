import React, { Component } from 'react'
import SongEntryPage from './SongEntryPage.js'
import parseTitleString from './../PlayerSongList/parseTitleString'
import TextField from 'material-ui/TextField'
import { browserHistory } from 'react-router'

class Container extends Component {

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
        if(videoItems.length < 1 && videoItems.length < 6){
         console.log("less than 5 songs")
        }
        else {
            videoItems.forEach(video => {
                var songInfo = parseTitleString(video.snippet.title)
                var userid = JSON.parse(sessionStorage.getItem('userId'))
                fetch('/api/songs', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        songName: songInfo.title,
                        user_id : userid,
                        artistName: songInfo.artist,
                        comment: video.comment,
                        songURL: `https://youtu.be/${video.id.videoId}`,
                        videoId: video.id.videoId,
                    })
                })
            })
            this.setState({successMessage: "Save Successful"})
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
