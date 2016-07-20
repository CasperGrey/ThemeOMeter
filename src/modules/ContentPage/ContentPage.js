/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ContentPage.css';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Form from './../Form.js'
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';

const title = 'Song Entry';

class ContentPage extends Component {

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

  handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          {this.props.path === '/' ? null : <h1>{this.props.title}</h1>}
          <div dangerouslySetInnerHTML={{ __html: this.props.content || '' }} />
          <Paper zDepth={3}>
            <Card className={s.cardStyle}>
              <CardTitle title="Let's Do This" subtitle="2016" />
              <Form>
                <Divider/>
                <Subheader>Where would you like to go</Subheader>
                <Divider/>
              </Form>
              <CardActions>
                <RaisedButton secondary={true} label="Song Entry" href='/entry'/>
                <RaisedButton primary={true} label="Score Theme"/>
              </CardActions>
            </Card>
          </Paper>
        </div>
      </div>
    );
  }
}

export default ContentPage

