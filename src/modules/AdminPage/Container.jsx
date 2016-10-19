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
        debugger
        // TODO: create check to make sure song hasnt been scored before
        if(theme_id==null){
         console.log("Invalid Theme ID")
        }
        else {
          fetch('/api/theme', {
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
    />
}

export default Container
