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
import s from './ContentPage.css';
import {Card, CardActions, CardTitle,CardMedia} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import { StyleSheet } from 'react-look'
import Login from './../LoginPage/LoginPage'
const title = 'Song Entry';

class ContentPage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };


  constructor(props) {
    super(props);
    this.state = {value: 1};
  }

  handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.containerStyle}>
          {this.props.path === '/' ? null : <h1>{this.props.title}</h1>}
          <div dangerouslySetInnerHTML={{ __html: this.props.content || '' }} />
          <Paper zDepth={3}>
            <Card className={"cardStyle"}>
              <CardMedia>
                <img src="/james-jean-talib.jpg" />
              </CardMedia>
              <CardTitle title="Let's Do This" subtitle="2016" />
                <Subheader>Where would you like to go</Subheader>
                <Divider/>
                <Login />
              <CardActions>
                <RaisedButton secondary={true} label="Song Entry" href='/entry'/>
                <RaisedButton primary={true} label="Score Theme" href='score'/>
              </CardActions>
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
    maxWidth: '900',
    textAlign: 'center',

  },

})

export default withStyles(s)(ContentPage)
