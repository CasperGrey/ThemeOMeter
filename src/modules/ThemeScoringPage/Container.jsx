import React, { Component } from 'react'
import ThemeScoringPage from './ThemeScoringPage.js'

class Container extends Component {

    componentDidMount = () => {
        debugger
        fetch('/api/songs/by-theme')
        .then(response => response.json())
        .then(songs => {
            this.setState({songs})
        })
    }

    state = {};

    render = () => <ThemeScoringPage
        {...this.props}
        songs={this.state.songs}
    />
}

export default Container