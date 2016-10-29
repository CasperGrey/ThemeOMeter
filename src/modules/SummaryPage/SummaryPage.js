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
import s from './SummaryPage.css';
import {Card, CardActions, CardTitle,CardMedia} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import { StyleSheet } from 'react-look'
import {LineChart,Line} from 'recharts'

const title = 'Summary Page';

const data = [
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];

class SummaryPage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  static propTypes = {
      songs: React.PropTypes.array,
      onCommentChange: React.PropTypes.func,
  }

  static defaultProps = {
      songs: [],
  }


  constructor(props) {
    super(props);
    this.state = {value: 1};
  }

  handleChange = (event, index, value) => this.setState({value});

  render() {
    const { songs } = this.props
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
              <CardTitle title="Summary"/>
                <LineChart width={400} height={400} data={this.props.songs}>
                  <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                </LineChart>
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

export default withStyles(s)(SummaryPage)
