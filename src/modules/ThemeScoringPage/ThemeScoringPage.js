/**
 * Created by johnstonb on 14/07/2016.
 */
/**
 * Created by johnstonb on 14/07/2016.
 */
import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ThemeScoringPage.css';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton'
import {Card, CardActions, CardTitle, CardMedia} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import { StyleSheet } from 'react-look';
import ScoreSlider from './ScoreSlider';
import Video_detail from "./../YoutubeSearch/Video_detail";
import{AvSkipPrevious,NavigationClose} from 'material-ui/svg-icons/';

const title = 'Song Entry';
const items = [];

class ThemeScoringPage extends Component {

    static contextTypes = {
        onSetTitle: PropTypes.func.isRequired,
    };

    static propTypes = {
        songs: React.PropTypes.array,
    }

    static defaultProps = {
        songs: [],
    }

    componentWillMount() {
        //this.context.onSetTitle(title);
    }

    constructor(props) {
        super(props);
        this.state = {value: 1, items: [], videoItems: []};
    }

    handleChange = (event, index, value) => {
        this.setState({value});
    }

    updateItems = (value) => {

        // We clone the existing items array with slice, so that we have a new
        // array rather than a reference to the existing one
        var items = this.state.items.slice()
        items.push(value)

        // Update state with the new array
        this.setState({items: items});
    }

    onAddVideo = (selectedVideo) => {
        // We clone the existing items array with slice, so that we have a new
        // array rather than a reference to the existing one
        var videoItems = this.state.videoItems.slice()
        videoItems.push(selectedVideo)

        // Update state with the new array
        this.setState({videoItems});
    };


    render() {
        debugger
        /*return <div>
            {this.props.songs.map(song => {
                return <div>{song.name}</div>
            })}
        </div>*/

        return (
            <div className={"root"}>
                <div className={styles.themescorecontainerStyle}>
                    {this.props.path === '/' ? null : <h1>{this.props.title}</h1>}
                    <div dangerouslySetInnerHTML={{ __html: this.props.content || '' }} />
                    <Paper zDepth={3}>
                        <Card className={styles.cardStyle}>
                            <CardMedia className={styles.img}>
                            <Video_detail video={{
                              id: {
                                videoId: 'H_a46WJ1viA',
                              },
                            }}/>
                            </CardMedia>
                            <IconButton tooltip="SVG Icon"
                            style ={styles.icons}>
                              <AvSkipPrevious color='red'/>
                              <NavigationClose color='red'/>
                            </IconButton>
                            <CardTitle title="Time to score!" subtitle="2016" />
                            <Divider/>
                            <Subheader>Theme X</Subheader>

                            <Divider/>
                            <Subheader>Score</Subheader>
                            <Divider/>
                            <ScoreSlider/>
                            <Subheader>Your Selections</Subheader>

                            <CardActions>
                                <RaisedButton secondary={true} label="Back"/>
                                <RaisedButton primary={true} label="Save"/>
                            </CardActions>
                        </Card>
                    </Paper>
                </div>
            </div>
        );
    }
}


const styles = StyleSheet.create({

    themescorecontainerStyle: {
        margin: '0 auto',
        padding: '0 0 40',
        maxWidth : '500',
        alignContent: 'center',

    },

    icons: {


    },

    cardStyle: {
        display: 'inline',
        margin: '24',
        marginTop: '2',
        transitionDuration: '0.3s',
        textAlign: 'center',
        border: '1 solid #ddd',
        boxShadow: '0 2 2 0 rgba(0, 0, 0, 0.14), 0 3 1 -2 rgba(0, 0, 0, 0.02),0 1 5 -2 rgba(0, 0, 0, 0.12)',
        maxWidth: '500',
    },

    dropdownStyle: {
        width:'200px',
    },

    img: {
      display: 'inline-flex',
      maxWidth:'100%',
      maxHeight:'100%',
      height:'auto',
      width:'auto', /* ie8 */
    },

})

export default withStyles(s)(ThemeScoringPage)
