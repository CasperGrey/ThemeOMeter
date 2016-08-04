/**
 * Created by johnstonb on 3/08/2016.
 */
import React from 'react';
import LinearProgress from 'material-ui/LinearProgress';
import moment from 'moment';

export default class Countdown extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      completed: 0,
      themeDate: moment().endOf('week').subtract('days',1)
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
    const millisecondsInAWeek = 1000 * 60 * 60 * 24 * 7
    this.setState({ 
      completed: (millisecondsInAWeek - diff) / millisecondsInAWeek * 100,
    })
  }

  render() {
    return <div className="Countdown">
      <LinearProgress mode="determinate" value={this.state.completed} />
      <span>{this.state.completed}</span>
    </div>
  }
}