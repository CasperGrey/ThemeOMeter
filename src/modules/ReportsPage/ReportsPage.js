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
import s from './ReportsPage.css';
import {Card, CardActions, CardTitle,CardMedia} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import { StyleSheet } from 'react-look'
const title = 'Reports Page';


class ReportsPage extends Component {

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
      <div className="root">
        <div className={styles.containerStyle}>
          {this.props.path === '/' ? null : <h1>{this.props.title}</h1>}
          <div dangerouslySetInnerHTML={{ __html: this.props.content || '' }} />
          <Paper zDepth={3}>
            <Card className={styles.cardStyle}>
              <CardMedia className={styles.img}>
                <img src="/james-jean-talib.jpg" />
              </CardMedia>
              <CardTitle title="Reports"/>
              <CardActions>
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

export default withStyles(s)(ReportsPage)
