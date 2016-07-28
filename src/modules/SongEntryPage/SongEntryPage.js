/**
 * Created by johnstonb on 14/07/2016.
 */
import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SongEntryPage.css';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardTitle} from 'material-ui/Card';
import Form from '../Form.js';
import Text from '../Text.js';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import EntryList from './EntryList';
import ListItem from './EntryListItem'
import EntryForm from './EntryForm'
import { StyleSheet } from 'react-look'
import YoutubeSearch from './../YoutubeSearch';
import Video_list from "./../YoutubeSearch/Video_list"

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


    render() {
    return (
      <div className={"root"}>
        <div className={styles.songentrycontainerStyle}>
          {this.props.path === '/' ? null : <h1>{this.props.title}</h1>}
          <div dangerouslySetInnerHTML={{ __html: this.props.content || '' }} />
         <Paper zDepth={3}>
           <Card className={styles.listGroupItem}>
            <CardTitle title="Please Enter Your Songs" subtitle="2016" />
             <Divider/>
             <Subheader>Please select the Theme</Subheader>
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
             <Subheader>Your Selections</Subheader>
               {/* Ensure we bind so that `this` will relate to the current component */}
             <Video_list videos={this.state.videoItems} />
          <CardActions>
          <RaisedButton secondary={true} label="Back"/>
          <RaisedButton primary={true} label="Save"/>
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
        padding: '0 0 40px',
        maxwidth : '900px',
        aligncontent: 'center',

    },

    cardStyle: {
        display: 'inline',
        margin: '24px',
        margintop: '2px',
        transitionduration: '0.3s',
        textalign: 'center',
        border: '1px solid #ddd',
        boxshadow: '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.02),0 1px 5px -2px rgba(0, 0, 0, 0.12)',
    },

    dropdownStyle: {
        width:'200px',
    },

})

export default withStyles(s)(SongEntryPage)





