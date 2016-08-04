/**
 * Created by johnstonb on 3/08/2016.
 */
import React from 'react';
import LinearProgress from 'material-ui/LinearProgress';
import moment from 'moment';
import { StyleSheet } from 'react-look';


export default class Countdown extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      completed: 0,
      themeDate: moment().endOf('week').subtract('hours',40),
      daysLeft: 0,
      minutesLeft: 0,
      hoursLeft: 0,
      secondsLeft:0,
    };
  }

  componentDidMount() {
    const { themeDate } = this.state
    // Update progress every second
    this.timer = setInterval(this.updateProgress.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  updateProgress() {  
    const { themeDate } = this.state
    var today = moment()
    const diff = themeDate.diff(today,'milliseconds');
    const daysDiff = themeDate.diff(today,'days');
    const hoursDiff = themeDate.diff(today,'hours') - (daysDiff * 24);
    const minutesDiff = themeDate.diff(today,'minutes') - (daysDiff * 24 * 60) - (hoursDiff  * 60);
    const secondsDiff = themeDate.diff(today,'seconds') - (daysDiff * 24 * 60*60) - (hoursDiff  * 60*60) - (minutesDiff * 60);
    const millisecondsInAWeek = 1000 * 60 * 60 * 24 * 7
    this.setState({ 
        completed: (millisecondsInAWeek - diff) / millisecondsInAWeek * 100,
        daysLeft: daysDiff,
        minutesLeft:minutesDiff,
        hoursLeft: hoursDiff,
        secondsLeft: secondsDiff,
    })
  }

  render() {
    return <div className="Countdown">
      <LinearProgress mode="determinate" value={this.state.completed} />
      <div className = {styles.countdownText}>
      <span> <h2>Theme Closes in </h2>{this.state.daysLeft} Day {this.state.hoursLeft} Hours {this.state.minutesLeft} Minutes {this.state.secondsLeft} Seconds</span>
      </div>
    </div>
  }

}

const styles = StyleSheet.create({

    countdownText: {
        margin: '30',

    },

})