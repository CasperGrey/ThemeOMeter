import React, { Component } from 'react'
import SongEntryPage from './SongEntryPage.js'
import parseTitleString from './../PlayerSongList/parseTitleString'
import TextField from 'material-ui/TextField'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import UserAlert from './../UserAlerts/UserAlert'


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
        open: false,
    };



    validateSongs = (videoItems) => {
          return Promise.all(videoItems.map(video => {
            return fetch('/api/songs/validate', {
              method: 'post',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                songName: video.title,
                artistName: video.artist,
              })
            })
            .then(response => response.text())
            .then(response => {
                // TODO There will be a response for each video item so this
                // probably won't work
                status = response
                console.log('Validate Status:',status)
                return status
            })
          }))
          // should be an array of the respones now
        };


        areEntriesComplete = (userId) => {
                fetch('/api/songs/entered', {
                  method: 'post',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    userId: userId,
                    theme_id: this.state.currentTheme.theme_id,
                  })
                })
                .then(response => response.text())
                .then(response => {
                    // TODO There will be a response for each video item so this
                    // probably won't work
                    var complete = response
                    console.log('Scoring Status:',complete)
                    return response
                })
          };

        onSave = async (videoItems) => {
           if(videoItems.length < 1){
             alert("Sorry you must choose at least 5 songs")
           } else {
             var statuses = await this.validateSongs(videoItems)
             statuses.forEach(async(status, i) => {
               var videoItem = videoItems[i]
               console.log(videoItem)
               console.log('On Save Status:',status)
               var userId = this.props.userId
               if(status == 'Not Found'){
                 fetch('/api/songs', {
                   method: 'post',
                   headers: {
                     'Content-Type': 'application/json',
                   },
                   body: JSON.stringify({
                     songName: videoItem.title,
                     user_id : userId,
                     artistName: videoItem.artist,
                     comment: videoItem.comment,
                     songURL: `https://youtu.be/${videoItem.id.videoId}`,
                     videoId: videoItem.id.videoId,
                   })
                 })
                 var completed = await this.areEntriesComplete(userId)
                 console.log(completed)
                 if(completed == 'Finished'){
                   this.setState({successMessage: "Save Succesful"})
                   setTimeout(function() {browserHistory.push('/score')}, 2000);
                 }
               } else if (status == 'Found') {
                 alert(" Oh Drat "+ videoItem.artist + " " + videoItem.title + " has previously been chosen")
               } else {
                 console.log('loading...')
               }
             })
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
export default connect(mapStateToProps)(Container)
