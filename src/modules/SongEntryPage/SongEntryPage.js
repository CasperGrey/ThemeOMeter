/**
 * Created by johnstonb on 14/07/2016.
 */
import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SongEntryPage.css';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardTitle} from 'material-ui/Card';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import { StyleSheet } from 'react-look'
import YoutubeSearch from './../YoutubeSearch';
import Countdown from  './Countdown';
import PlayerSongList from './../PlayerSongList/PlayerSongList'

// import YoutubeAutocomplete from '../YoutubeSearch/YoutubeAutocomplete.js'
// Needed for onTouchTap

const title = 'Song Entry';
const items = [];

class SongEntryPage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };


  componentWillMount() {
    //this.context.onSetTitle(title);
  }

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
    }

    render() {

        var { onSave } = this.props
        if (!onSave) onSave = function(){}
    return (
      <div className={"root"}>
        <div className={styles.songentrycontainerStyle}>
          {this.props.path === '/' ? null : <h1>{this.props.title}</h1>}
          <div dangerouslySetInnerHTML={{ __html: this.props.content || '' }} />
         <Paper zDepth={3}>
           <Card className={styles.cardStyle}>
            <CardTitle title="Please Enter Your Songs" subtitle="2016" />
             <Divider/>
             <Subheader>Current theme: {this.props.currentTheme}</Subheader>
               <Countdown/>
             <DropDownMenu
              value={this.state.value}
              onChange={this.handleChange}
              className ={styles.dropdownStyle}
              autoWidth={false}
             >
              <MenuItem value={1} primaryText="Theme" />
              <MenuItem value={2} primaryText="Blue" />
              <MenuItem value={3} primaryText="Rock" />
              <MenuItem value={4} primaryText="Pop" />
              <MenuItem value={5} primaryText="Jazz" />
            </DropDownMenu>
            <Divider/>
            <Subheader>Search Youtube</Subheader>
            <YoutubeSearch onAddVideo={this.onAddVideo} />
            <Divider/>
            <div style={{clear: 'both'}} />
             <Subheader>Your Selections</Subheader>
               {/* Ensure we bind so that `this` will relate to the current component */}
             <PlayerSongList videos={this.state.videoItems} onDelete={this.onDeleteVideo} />
          <CardActions>
          <RaisedButton secondary={true} label="Back"/>
          <RaisedButton primary={true} label="Save" onClick={() => onSave(this.state.videoItems)} />
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
        maxWidth : '900',
        alignContent: 'center',

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

})

export default withStyles(s)(SongEntryPage)





