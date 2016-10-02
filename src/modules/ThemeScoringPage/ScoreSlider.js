import React from 'react';
import Slider from 'material-ui/Slider';
import Toggle from 'material-ui/Toggle';

/**
 * The slider bar can have a set minimum and maximum, and the value can be
 * obtained through the value parameter fired on an onChange event.
 */
export default class ScoreSlider extends React.Component {

      static propTypes = {
          onChange: React.PropTypes.func,
      };

    state = {
        firstSlider: this.props.value || 5,
        secondSlider: 5,
        thirdSlider: 5,
        simpleView: true,
    }

    componentWillReceiveProps = (newProps) => {
       if (newProps.value)
            this.setState({firstSlider: newProps.value})
    };

    handleFirstSlider(event, value) {
        this.setState({firstSlider: value});

        if (this.props.onChange)
          this.props.onChange(event, value)
    }

    handleSecondSlider(event, value) {

        const { thirdSlider } = this.state

        this.setState({
            firstSlider: (value + thirdSlider) / 2,
            secondSlider: value,
        });
        if (this.props.onChange)
           this.props.onChange(value)

     }

    

    handleThirdSlider(event, value) {
        const { secondSlider } = this.state

        this.setState({
            firstSlider: (value + secondSlider) / 2,
            thirdSlider: value,
        });
    }

    setOverallScore = () => {
        var { secondSlider, thirdSlider } = this.state
        var firstSlider = (secondSlider + thirdSlider) / 2

        this.setState({secondSlider: value});
    }


    render() {

        const { simpleView } = this.state

        return (
            <div>
                <div>
                    <div style={{display: 'inline-block', verticalAlign: 'middle',}}>Simple</div>
                    <div style={{display: 'inline-block', verticalAlign: 'middle',}}><Toggle onToggle={() => this.setState({simpleView: !simpleView})} /></div>
                    <div style={{display: 'inline-block', verticalAlign: 'middle',}}>Advanced</div>
                </div>
                <p>
                    <span>{'Overall Score: '}</span>
                    <span>{this.state.firstSlider}</span>
                </p>
                <Slider
                    min={0}
                    max={10}
                    step={0.01}
                    defaultValue={5}
                    value={this.state.firstSlider}
                    onChange={this.handleFirstSlider.bind(this)}
                />
                <div style={{display: simpleView ? 'none' : 'block'}}>
                    <p>
                        <span>{'Theme Score: '}</span>
                        <span>{this.state.secondSlider}</span>
                    </p>
                    <Slider
                        min={0}
                        max={10}
                        step={0.01}
                        defaultValue={5}
                        value={this.state.secondSlider}
                        onChange={this.handleSecondSlider.bind(this)}
                    />
                    <p>
                        <span>Song Score: </span>
                        <span>{this.state.thirdSlider}</span>
                    </p>
                    <Slider
                        min={0}
                        max={10}
                        step={0.01}
                        defaultValue={5}
                        value={this.state.thirdSlider}
                        onChange={this.handleThirdSlider.bind(this)}
                    />
                </div>
            </div>
        );
    }

}
