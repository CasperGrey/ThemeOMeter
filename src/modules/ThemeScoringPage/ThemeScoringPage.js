/**
 * Created by johnstonb on 14/07/2016.
 */
/**
 * Created by johnstonb on 14/07/2016.
 */
import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton'
import {Card, CardActions, CardTitle, CardMedia} from 'material-ui/Card';
import TextField from 'material-ui/TextField'
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';
import jss from 'jss'
import ScoreSlider from './ScoreSlider';
import Video_detail from "./../YoutubeSearch/Video_detail";
import{AvSkipNext,AvSkipPrevious,NavigationClose} from 'material-ui/svg-icons/';
import SvgIconFace from 'material-ui/svg-icons/action/face';


const title = 'Song Entry';
const items = [];

const {classes} = jss.createStyleSheet({

    themescorecontainerStyle: {
        margin: '0 auto',
        maxWidth : 500,
        alignContent: 'center',

    },
    cardStyle: {
        display: 'inline',
        //margin: 24,
        marginTop: 2,
        transitionDuration: '0.3s',
        textAlign: 'center',
        border: '1px solid #ddd',
        boxShadow: '0 2 2 0 rgba(0, 0, 0, 0.14), 0 3 1 -2 rgba(0, 0, 0, 0.02),0 1 5 -2 rgba(0, 0, 0, 0.12)',
        maxWidth: 500,
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
    chip: {
        margin: 4,
    },
    wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    },
}).attach()


class ThemeScoringPage extends Component {

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

    componentWillMount() {
        //this.context.onSetTitle(title);
    }

    constructor(props) {
        super(props);
    }

    state = {
        value: 1,
        items: [],
        videoItems: [],
        selectedSongIndex: 0,
        score: 5,
        comment: '',
    };

    handleChange = (event, index, value) => {
        this.setState({value});
    }

    updateItems = (song) => {

        // We clone the existing items array with slice, so that we have a new
        // array rather than a reference to the existing one
        var songs = this.props.songs.slice()
        songs.push(song)

        // Update state with the new array
        this.setState({songs: songs});
    }


    onCommentChange = (e,   value) => {
        this.setState({comment: value})
    };

    onScoreChange = (e, value) => {
        this.setState({score: value})

    };

    onDeleteVideo = (song) => {
        const { songs } = this.props
        let index = videoItems.indexOf(song)
        var newSongs = songs.slice()
        newSongs.splice(index, 1)
        this.setState({videoItems: newVideos})
    };


       handleRequestDelete() {
        alert('You clicked the delete button.');
      }

       handleTouchTap() {
        alert('You clicked the Chip.');
      }

    render() {
        /*return <div>
            {this.props.songs.map(song => {
                return <div>{song.name}</div>
            })}
        </div>*/
        var {onSave,onChange,onCommentChange} = this.props
        if (!onSave) onSave = function(){}


        const { songs } = this.props
        const { selectedSongIndex, score, comment} = this.state
        var selectedSong = songs[selectedSongIndex]
        // Add score & comment to the song object
        if (selectedSong){
            Object.assign(selectedSong, {score})
            Object.assign(selectedSong, {comment})
          }
        return (
            <div className={"root"}>
                <div className={classes.themescorecontainerStyle}>
                    {this.props.path === '/' ? null : <h1>{this.props.title}</h1>}
                    <div dangerouslySetInnerHTML={{ __html: this.props.content || '' }} />
                    <Paper zDepth={3}>
                        <Card className={classes.cardStyle}>
                            <CardMedia className={classes.img}>
                            {this.props.songs.length >= 1 ?
                              [
                                <Video_detail video={{
                                    id: {
                                        videoId:this.props.songs[this.state.selectedSongIndex].video_id,
                                        },
                                }}/>,

                                  <Chip
                                    onRequestDelete={this.handleRequestDelete}
                                    onTouchTap={this.handleTouchTap}
                                    className={classes.chip}
                                  >
                                    <Avatar color="#EC407A" icon={<SvgIconFace />} />
                                      {selectedSong.user_comment}
                                  </Chip>

                              ]
                             : null}
                            </CardMedia>
                            <Divider/>
                            <IconButton tooltip="Prev Song"
                            style ={classes.icons}
                            onClick={() => {
                                if(this.state.selectedSongIndex < 0){
                                  this.state.selectedSongIndex= 0
                                }
                                else{
                                  this.setState({selectedSongIndex: this.state.selectedSongIndex -1})
                                  this.setState({comment: ''})
                                }
                              }}>
                              <AvSkipPrevious color='grey'/>
                            </IconButton>

                            <IconButton tooltip="Next Song"
                            style ={classes.icons}
                            onClick={() => {
                                if(this.state.selectedSongIndex < this.props.songs.length){
                                  this.setState({selectedSongIndex: this.state.selectedSongIndex +1})
                                  this.setState({comment: ''})
                                }
                                else{
                                  this.state.selectedSongIndex= 0
                                }
                              }}>
                              <AvSkipNext color='grey'/>
                            </IconButton>
                            <Divider/>
                            <Subheader>{this.props.currentTheme}</Subheader>
                            <ScoreSlider onChange={this.onScoreChange}/>
                            <TextField
                                multiLine={true}
                                floatingLabelText={"Comment Box"}
                                hintText ={"Anything you'd like to get off your chest?"}
                                onChange={this.onCommentChange}
                                value={selectedSong ? selectedSong.comment : ''}
                            />
                            <CardActions>
                                <RaisedButton primary={true} label="Save" onClick={() => onSave(this.props.songs,this.state.selectedSongIndex)}/>
                            </CardActions>
                        </Card>
                    </Paper>
                </div>
            </div>
        );
    }
}


export default ThemeScoringPage
