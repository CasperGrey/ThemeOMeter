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
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import { StyleSheet } from 'react-look'
import {LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

const title = 'Summary Page';

const dataScoreAvgs = [
      {name: 'MJ', Given: 4.0, Received: 2.400},
      {name: 'Ben', Given: 3.0, Received: 1.398},
      {name: 'Sarah', Given: 2.0, Received: 9.800},
      {name: 'Dave', Given: 2.78, Received: 3.908},
      {name: 'TK', Given: 1.890, Received: 4.800},
      {name: 'Otto', Given: 2.390, Received: 3.800},
      {name: 'James', Given: 3.490, Received: 4.300},
];

const dataScoresGivenByAgent = [
      {name: 'Ben', Score: 1.398, amt: 2210},
      {name: 'Sarah', Score: 9.800, amt: 2290},
      {name: 'Dave', Score: 3.908, amt: 2000},
      {name: 'TK', Score: 4.800, amt: 2181},
      {name: 'Otto', Score: 3.800, amt: 2500},
      {name: 'James', Score: 4.300, amt: 2100},
];

const dataScoresReceivedByAgent = [
      {name: 'Ben', Score: 3.0},
      {name: 'Sarah', Score: 2.0},
      {name: 'Dave', Score: 2.78},
      {name: 'TK', Score: 1.890},
      {name: 'Otto', Score: 2.390},
      {name: 'James', Score: 3.490},
];

const dataTopFive = [
      {name: 'song1', Picker: 'Otto', Score: 8.0},
      {name: 'song2', Picker: 'Ben', Score: 7.5},
      {name: 'song3', Picker: 'MJ', Score: 7.4},
      {name: 'song4', Picker: 'Ben', Score: 7.12},
      {name: 'song5', Picker: 'Dave', Score: 7.0},
];

const dataBottomFive = [
      {name: 'song1', Picker: 'Dave', Score: 2.0},
      {name: 'song2', Picker: 'TK', Score: 4.5},
      {name: 'song3', Picker: 'Sarah', Score: 5.4},
      {name: 'song4', Picker: 'Ben', Score: 5.52},
      {name: 'song5', Picker: 'MJ', Score: 6.0},
];

const dataThemeRating = [
      {name: 'theme1', Score: 8.0, ThisScore: 7.1},
      {name: 'theme2', Score: 7.5, ThisScore: 7.1},
      {name: 'theme3', Score: 7.4, ThisScore: 7.1},
      {name: 'theme4', Score: 7.12, ThisScore: 7.1},
      {name: 'theme5', Score: 7.0, ThisScore: 7.1},
];

const dataGenreRating = [
      {name: 'Metal', Score: 6.0 },
      {name: 'Rock', Score: 6.5 },
      {name: 'Pop', Score: 7.0 },
      {name: 'Hip Hop', Score: 5.4 },
      {name: 'Country', Score: 4.2 },
];

const dataThemeProgress = [
      {name: 'Progress', progress: 0.5 },
];


class SummaryPage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  static propTypes = {
      songs: React.PropTypes.array,
      userscores: React.PropTypes.array,
      onCommentChange: React.PropTypes.func,
  }

  static defaultProps = {
      songs: [],
      userscores: [],
  }


  constructor(props) {
    super(props);
    this.state = {value: 1};
  }

  handleChange = (event, index, value) => this.setState({value});

  render() {
    const { songs , userscores , userscoring} = this.props
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
              <Subheader>Progress</Subheader>
              <BarChart width={500} height={100} data={dataThemeProgress}
                 margin={{top: 5, right: 30, left: 20, bottom: 5}}>
               <XAxis dataKey="name"/>
               <YAxis/>
               <CartesianGrid strokeDasharray="3 3"/>
               <Tooltip/>
               <Legend/>
               <Bar dataKey="progress" fill="#8884d8"  />
              </BarChart>
              <Divider/><Subheader>How you were scored</Subheader>
              <BarChart width={500} height={400} data={userscores}
                  margin={{top: 5, right: 30, left: 20, bottom: 5}}>
               <XAxis dataKey='agent_name'/>
               <YAxis/>
               <CartesianGrid strokeDasharray="3 3"/>
               <Tooltip/>
               <Legend/>
               <Bar dataKey="Score" fill="#8884d8"  />
              </BarChart>
              <Divider/><Subheader>How you scored</Subheader>
              <BarChart width={500} height={400} data={userscoring}
                  margin={{top: 5, right: 30, left: 20, bottom: 5}}>
               <XAxis dataKey="agent_name"/>
               <YAxis/>
               <CartesianGrid strokeDasharray="3 3"/>
               <Tooltip/>
               <Legend/>
               <Bar dataKey="Score" fill="#82ca9d"   />
              </BarChart>
              <Divider/>
              <Subheader>Comparison</Subheader>
              <LineChart width={500} height={400} data={dataScoreAvgs}
                  margin={{top: 5, right: 30, left: 20, bottom: 5}}>
               <XAxis dataKey="name"/>
               <YAxis/>
               <CartesianGrid strokeDasharray="3 3"/>
               <Tooltip/>
               <Legend/>
               <Line type="monotone" dataKey="Given" stroke="#8884d8" activeDot={{r: 8}}/>
               <Line type="monotone" dataKey="Received" stroke="#82ca9d" />
              </LineChart>
              <Divider/>
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
