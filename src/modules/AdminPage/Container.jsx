import React, { Component } from 'react'
import AdminPage from './AdminPage.js'


class Container extends Component {

  componentDidMount = () => {

    fetch('/api/themes/current')
    .then(response => response.json())
    .then(json => {
        this.setState({
            currentTheme: json.name,
            theme_id: json.theme_id
        })
    })

  }


    onSave = (theme_id) => {
        if(theme_id==null){
         console.log("Invalid Theme ID")
        }
        else {
          console.log("Theme_id not null - processing POST")
          fetch('/api/themes', {
              method: 'post',
              headers: {
                  'Content-Type': 'application/json',
              },
                body: JSON.stringify({
                  theme_id: theme_id,
                })
            })
        }
        debugger
    };


    createSave = (theme_name) => {
        if(theme_name==null){
         console.log("Invalid Theme name")
        }
        else {
          console.log("Theme_name not null - processing POST")
          fetch('/api/themes/create', {
              method: 'post',
              headers: {
                  'Content-Type': 'application/json',
              },
                body: JSON.stringify({
                  theme_name: theme_name,
                })
            })
        }
        debugger
    };

    SongsByUser =(user_id) => {
        if(theme_name==null){
         console.log("Invalid User Id")
        }
        else {
          console.log("User ID not null - processing POST")
          fetch('/api/songs//in-current-theme', {
              method: 'post',
              headers: {
                  'Content-Type': 'application/json',
              },
                body: JSON.stringify({
                  user_id: user_id,
                })
                .then(response => response.json())
                .then(json => {
                  this.setState({songs})
                })

            })
        }
        debugger
    };

    clearSongs =(theme_id) => {
      if(theme_id==null){
       console.log("Invalid Theme ID")
      }
      else {
        console.log("Theme_id not null - processing POST")
        fetch('/api/themes/wipe', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
              body: JSON.stringify({
                theme_id: theme_id,
              })
          })
      }
      debugger
    };

    state = {};

    render = () => <AdminPage
        {...this.props}
        currentTheme={this.state.currentTheme}
        themeid={this.state.theme_id}
        onSave={this.onSave}
        themes={this.state.themes}
        clearSongs={this.clearSongs}
        createSave={this.createSave}
        SongsByUser={this.SongsbyUser}
        songs={this.state.songs}
    />
}

export default Container
