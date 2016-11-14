/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AdminPage.css';
import {Card, CardActions, CardTitle,CardMedia} from 'material-ui/Card';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import { StyleSheet } from 'react-look'
import TextField from 'material-ui/TextField'
import {Table,TableRow,TableHeaderColumn,TableHeader,TableRowColumn,TableBody} from 'material-ui/Table';
const title = 'Admin Page';


class AdminPage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  static defaultProps = {
      songs: [],
  }


  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      theme_id: 0,
      theme_name:'',
      user_id:'',
      data : this.props.songs,
     fixedHeader: true,
     fixedFooter: true,
     stripedRows: false,
     showRowHover: true,
     selectable: true,
     multiSelectable: false,
     enableSelectAll: false,
     deselectOnClickaway: true,
     height: '300px',
    };
  };

  getInitialState() {
  return {
    data : this.props.songs,
    fixedHeader: true,
    fixedFooter: true,
    stripedRows: false,
    showRowHover: true,
    selectable: true,
    multiSelectable: false,
    enableSelectAll: false,
    deselectOnClickaway: true,
    height: '300px',
  };
  }

  _onRowSelection(key) {
    console.log(key, this.state.data[key])
  }

  handleChange = (event,value) => this.setState({theme_id: value});
  handleChangeCreate = (event,value) => this.setState({theme_name: value});
  handleChangeUser = (event,value) => this.setState({user_id: value});

  render() {
    const { songs } = this.props
    var {createSave,onSave,clearSongs,SongsByUser} = this.props
    if (!onSave) onSave = function(){}
    return (
      <div className="root">
        <div className={styles.containerStyle}>
          {this.props.path === '/' ? null : <h1>{this.props.title}</h1>}
          <div dangerouslySetInnerHTML={{ __html: this.props.content || '' }} />
          <Paper zDepth={3}>
            <Card className={styles.cardStyle}>
              <CardMedia className={styles.img}>
                <img src="/james-jean-talib.jpg" />
              </CardMedia>
              <CardTitle title="Admin"/>
              <div>
               <Subheader>Current theme: {this.props.currentTheme}</Subheader>
               <RaisedButton primary={true} label="Wipe Songs" onClick={() => clearSongs(this.props.themeid)}/>
              </div>
              <CardActions>
              </CardActions>
              <div>
                 <Subheader>Change Theme</Subheader>
                <TextField
                  ref="Theme_id_entry"
                  value={this.state.theme_id}
                  onChange={this.handleChange}
                />
              <RaisedButton primary={true} label="Save" onClick={() => onSave(this.state.theme_id)}/>
             </div>
             <div>
             <Subheader>Create A Theme</Subheader>
             <TextField
               ref="Theme_create"
               value={this.state.theme_name}
               onChange={this.handleChangeCreate}
             />
           <RaisedButton primary={true} label="Save" onClick={() => createSave(this.state.theme_name)}/>
          </div>
          <div>
          <Subheader>Search Songs By User</Subheader>
          <TextField
            ref="Songs By USer"
            value={this.state.user_id}
            onChange={this.handleChangeUser}
          />
        <RaisedButton primary={true} label="Save" onClick={() =>  SongsByUser(this.state.user_id)}/>
       </div>
       <div>
      <div className="col-sm-6">
        <Table
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
          onRowSelection={this._onRowSelection}
        >
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Date Added</TableHeaderColumn>
                <TableHeaderColumn>Theme ID</TableHeaderColumn>
                <TableHeaderColumn>Agent ID</TableHeaderColumn>
                  <TableHeaderColumn>Song ID</TableHeaderColumn>
                  <TableHeaderColumn>Valid Entry</TableHeaderColumn>
                    <TableHeaderColumn>User Comment</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
          >
            {this.state.data.map((songs, i) =>
              <TableRow key={i} value={songs}>
                <TableRowColumn>{songs.entry_id}</TableRowColumn>
                <TableRowColumn>{songs.date_added}</TableRowColumn>
                <TableRowColumn>{songs.theme_id}</TableRowColumn>
                <TableRowColumn>{songs.agent_id}</TableRowColumn>
                <TableRowColumn>{songs.song_id}</TableRowColumn>
                <TableRowColumn>{songs.valid_entry}</TableRowColumn>
                <TableRowColumn>{songs.user_comment}</TableRowColumn>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
            </Card>
          </Paper>
        </div>
      </div>
    );
  }
}

const styles = StyleSheet.create({

    root: {
    margin: '0 auto',
    },
  containerStyle: {
    margin: '0 auto',
    padding: '0 0 40',
    maxWidth: '500',
    textAlign: 'center',

  },

  cardStyle: {

    maxWidth: '500',
    textAlign: 'center',

  },

  img: {
    display: 'inline-flex',
    maxWidth:'100%',
    maxHeight:'100%',
    height:'auto',
    width:'auto', /* ie8 */
  },

})

export default withStyles(s)(AdminPage)
