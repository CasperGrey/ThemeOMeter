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

import YoutubeSearch from './../YoutubeSearch';

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
    this.state = {value: 1};
  }

  handleChange = (event, index, value) => {
    this.setState({value});
  }

  updateItems = (value) => {
      var allItems = this.state.items.concat([value]);
      this.setState({items: allItems});
  }




    render() {
    return (
      <div className={"entryroot"}>
        <div className={"entrycontainer"}>
          {this.props.path === '/' ? null : <h1>{this.props.title}</h1>}
          <div dangerouslySetInnerHTML={{ __html: this.props.content || '' }} />
         <Paper zDepth={3}>
           <Card className={"cardStyle"}>
            <CardTitle title="Please Enter Your Songs" subtitle="2016" />
             <Form>
             <Divider/>
             <Subheader>Please select the Theme</Subheader>
             <DropDownMenu
              value={this.state.value}
              onChange={this.handleChange}
              className ={"dropdownStyle"}
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
            <YoutubeSearch />
            <Divider/>
             <Subheader>Your Selection</Subheader>
            <EntryList items={this.state.items} />
            <EntryForm onFormSubmit={this.updateItems}/>
            </Form>
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
export default withStyles(s)(SongEntryPage)

