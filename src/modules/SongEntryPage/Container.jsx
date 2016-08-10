import React, { Component } from 'react'
import SongEntryPage from './SongEntryPage.js'
import parseTitleString from './../PlayerSongList/parseTitleString'

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

    onSave = (videoItems) => {

        if(videoItems.length < 1){
         console.log("less than 5 songs")
        }
        else {
            videoItems.forEach(video => {

                var songInfo = parseTitleString(video.snippet.title)

                fetch('/api/songs', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        songName: songInfo.title,
                        artistName: songInfo.artist,
                        comment: video.comment,
                    })
                })
            })
        }
    };



    state = {};

    render = () => <SongEntryPage
        {...this.props}
        currentTheme={this.state.currentTheme}
        onSave={this.onSave}
    />
}



export default Container