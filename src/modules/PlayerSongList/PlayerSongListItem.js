import React from "react"
import { StyleSheet } from 'react-look'
import { NavigationClose } from 'material-ui/svg-icons'
import IconButton from 'material-ui/IconButton'
import ListItem from 'material-ui/List/ListItem'
import TextField from 'material-ui/TextField'

class PlayerSongListItem extends React.Component {

    static propTypes = {
        onDelete: React.PropTypes.func,
    }

    render = () => {
        var {video, onVideoSelect, onDelete} = this.props
        const imageUrl = video.snippet.thumbnails.default.url;

        if (onVideoSelect == null)
            onVideoSelect = function(){}

        return <ListItem
                onClick={ () => onVideoSelect(video) }
                className={styles.listGroupItem}
                rightIconButton={onDelete ?
                <div className={styles.deleteButton}>
                    <IconButton onClick={() => onDelete(video)}>
                        <NavigationClose color="red" />
                    </IconButton>
                </div> : null}>

                <div className={styles.videoListMedia}>
                    <div className="media-left">
                        <img className="media-object" src={imageUrl}/>
                    </div>
                    <div className="media-body">
                        <div className={styles.mediaHeading}>
                            {video.snippet.title}
                        </div>
                    </div>
                    <div className = {styles.extraSongInfo}>
                        comment about music
                    </div>
                    <TextField
                        floatingLabelText={"Artist"}
                        hintText ={"Your song artist"}
                        defaultValue={video.snippet.title}
                    />
                    <TextField
                        floatingLabelText={"Song"}
                        hintText ={"Title of your song"}
                    />
                    <TextField
                        multiLine={true}
                        floatingLabelText={"Comment Box"}
                        hintText ={"Describe why you chose this song."}
                    />
                 </div>
             </ListItem>
    }
}

const styles = StyleSheet.create({
    listGroupItem: {
        display: 'flex',
        flexWrap:'wrap',
        textAlign: 'left',
        position: 'relative',
        listStyleType: 'decimal',
        margin: 100,
        height: 180,
    },
    deleteButton:{
        position: 'absolute',
        top: 0,
        right: 0,
    },
    extraSongInfo:{


    },
    mediaHeading:{


    },

    videoListMedia: {
        display: 'flex',

    },
})

export default PlayerSongListItem