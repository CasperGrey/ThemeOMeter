import React from "react"
import { StyleSheet } from 'react-look'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import IconButton from 'material-ui/IconButton'
import ListItem from 'material-ui/List/ListItem'
import TextField from 'material-ui/TextField'
import parseTitleString from './parseTitleString'
import Paper from 'material-ui/Paper'

class PlayerSongListItem extends React.Component {

    static propTypes = {
        onDelete: React.PropTypes.func,
        onCommentChange: React.PropTypes.func,
    }

    static defaultProps = {
        comment: "",
    }

    componentDidMount = () => {

      this.refs.songcomment.focus()

    }

    render = () => {
        var {video, onVideoSelect, onDelete, onCommentChange} = this.props
        const imageUrl = video.snippet.thumbnails.default.url;

        if (onVideoSelect == null)
            onVideoSelect = function(){}

        return <div className={styles.listItemWrapper}>
                    <ListItem
            onClick={ () => onVideoSelect(video) }
            className={styles.listGroupItem}
            rightIconButton={onDelete ?
                <div className={styles.deleteButton}>
                    <IconButton onClick={() => onDelete(video)}>
                        <NavigationClose color="red" />
                    </IconButton>
                </div> : null}>

            <table className={styles.videoListMedia}>
                <tbody>
                <tr>
                    <td className={styles.mediaLeft}>
                        <img className="media-object" src={imageUrl}/>
                    </td>
                    <td>
                      // TODO: Placeholder for facts about music chosen.
                        // <div className = {styles.extraSongInfo}>
                        //     comment about music
                        // </div>
                        <br />
                        <TextField
                            floatingLabelText={"Artist"}
                            hintText ={"Your song artist"}
                            defaultValue={parseTitleString(video.snippet.title).artist}
                        />
                        <br />
                        <TextField
                            floatingLabelText={"Song"}
                            hintText ={"Title of your song"}
                            defaultValue={parseTitleString(video.snippet.title).title}
                        />
                        <br />
                        <TextField
                            ref="songcomment"
                            multiLine={true}
                            floatingLabelText={"Comment Box"}
                            hintText ={"Describe why you chose this song."}
                            onChange={onCommentChange}
                            value={video.comment}
                        />
                    </td>
                </tr>
                </tbody>
            </table>
        </ListItem>
    </div>
    }
}

const styles = StyleSheet.create({
    listItemWrapper: {
        borderBottom: '1px solid #00bcd4',
    },
    listGroupItem: {
        display: 'flex',
        flexWrap:'wrap',
        textAlign: 'left',
        position: 'relative',
        listStyleType: 'decimal',
        margin: 100,
    },
    deleteButton:{
        position: 'absolute',
        top: 0,
        right: 0,
    },
    extraSongInfo:{


    },

    videoListMedia: {
        display: 'flex',

    },
    mediaLeft: {
        padding: 20,
    }
})

export default PlayerSongListItem
