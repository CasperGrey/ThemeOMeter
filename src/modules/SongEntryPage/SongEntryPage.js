/**
 * Created by johnstonb on 14/07/2016.
 */
import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SongEntryPage.css';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardTitle, CardMedia} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import { StyleSheet } from 'react-look'
import YoutubeSearch from './../YoutubeSearch';
import Countdown from  './Countdown';
import PlayerSongList from './../PlayerSongList/PlayerSongList'
import TextField from 'material-ui/TextField'


const title = 'Song Entry';
const items = [];

class SongEntryPage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  state = {
      successMessage: "",
  };


  constructor(props) {
    super(props);
    this.state = {value: 1, items: [], videoItems: []};
  }

  handleChange = (event, index, value) => {
    this.setState({value});
  }

  updateItems = (value) => {

    // We clone the existing items array with slice, so that we have a new
    // array rather than a reference to the existing one
    var items = this.state.items.slice()
    items.push(value)

    // Update state with the new array
    this.setState({items: items});
  }

    onAddVideo = (selectedVideo) => {
        // We clone the existing items array with slice, so that we have a new
        // array rather than a reference to the existing one
        var videoItems = this.state.videoItems.slice()
        videoItems.push(selectedVideo)

        // Update state with the new array
        this.setState({videoItems});
    };

    onDeleteVideo = (video) => {
        const { videoItems } = this.state
        let index = videoItems.indexOf(video)
        var newVideos = videoItems.slice()
        newVideos.splice(index, 1)
        this.setState({videoItems: newVideos})
    };

    onCommentChange = (video, i, comment) => {
        var videoItems = this.state.videoItems.slice()
        videoItems[i].comment = comment
        this.setState({videoItems})
    };



    render() {

        var { onSave, onCommentChange } = this.props
        if (!onSave) onSave = function(){}
    return (
      <div className={"root"}>
        <div className={styles.songentrycontainerStyle}>
          {this.props.path === '/' ? null : <h1>{this.props.title}</h1>}
          <div dangerouslySetInnerHTML={{ __html: this.props.content || '' }} />
         <Paper zDepth={3}>
           <Card className={styles.cardStyle}>
           <CardMedia className={styles.img}>
             <img src="/james-jean.jpg" width="200px" height="auto" />
           </CardMedia>
           <Divider/>
           <div className ={styles.themeTitle}>
             <Subheader>Current theme: {this.props.currentTheme}</Subheader>
            </div>
            <Countdown/>
            <Divider/>
            <Subheader style= {styles.searchsection}>Search Youtube</Subheader>
            <YoutubeSearch onAddVideo={this.onAddVideo} />
            <Divider/>
            <div style={{clear: 'both'}} />
            <Subheader>Your Selections</Subheader>
            {/* Ensure we bind so that `this` will relate to the current component */}
            <PlayerSongList videos={this.state.videoItems} onDelete={this.onDeleteVideo} onCommentChange={this.onCommentChange} />
          <CardActions>
          <RaisedButton secondary={true} label="Back" href="/"/>
          <RaisedButton primary={true} label="Finish" onClick={() => onSave(this.state.videoItems)}/>
            <div>
              <TextField
                id="success-text"
                value={this.props.successMessage}
              />
           </div>
          </CardActions>
         </Card>
       </Paper>
      </div>
    </div>
    );
  }
}


const styles = StyleSheet.create({

    songentrycontainerStyle: {
        margin: '0 auto',
        padding: '0 0 40',
        maxWidth : '500',
        alignContent: 'center',

    },

    searchsection: {
        height : '50',
    },

    cardStyle: {
        display: 'inline',
        margin: '24',
        marginTop: '2',
        transitionDuration: '0.3s',
        textAlign: 'center',
        border: '1 solid #ddd',
        boxShadow: '0 2 2 0 rgba(0, 0, 0, 0.14), 0 3 1 -2 rgba(0, 0, 0, 0.02),0 1 5 -2 rgba(0, 0, 0, 0.12)',
    },

    dropdownStyle: {
        width:'200px',
    },

    themeTitle: {
        margin: '10',
        fontSize: 'small',

    },


    img: {
      display: 'inline-flex',
      maxWidth:'75%',
      maxHeight:'75%',
      height:'auto',
      width:'auto', /* ie8 */
    },

})

export default withStyles(s)(SongEntryPage)
