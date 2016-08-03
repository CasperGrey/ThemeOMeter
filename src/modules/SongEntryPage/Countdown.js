/**
 * Created by johnstonb on 3/08/2016.
 */
import React from 'react';
import LinearProgress from 'material-ui/LinearProgress';

export default class Countdown extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            completed: 0,
            themeDate: 0,
        };
    }

    componentDidMount() {
        this.timer = setTimeout(() => this.progress(5), 1000);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    progress(completed) {
        if (completed > 100) {
            this.setState({completed: 100});
        } else {
            this.setState({completed});
            const diff = Math.random() * 10;
            this.timer = setTimeout(() => this.progress(completed + diff), 1000);
        }
    }

    render() {
        return (
            <div className="Countdown">
            <LinearProgress mode="determinate" value={this.state.completed} />
            <span>{this.state.completed}</span>
            </div>
        );
    }
}