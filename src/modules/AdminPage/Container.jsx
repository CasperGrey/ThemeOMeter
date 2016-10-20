import React, { Component } from 'react'
import AdminPage from './AdminPage.js'


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
        onSave={this.onSave}
        themes={this.state.themes}
        clearSongs={this.clearSongs}
    />
}

export default Container
