import React, { Component } from 'react'
import SongEntryPage from './SongEntryPage.js'

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
        debugger
        videoItems.forEach(video => {
            fetch('/api/songs', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    songName: video.snippet.title,
                })
            })
        })

    };

    state = {};

    render = () => <SongEntryPage
        {...this.props}
        currentTheme={this.state.currentTheme}
        onSave={this.onSave}
    />
}



export default Container