import React from "react"
import PlayerSongListItem from "./PlayerSongListItem"
import List from 'material-ui/List'


class PlayerSongList extends React.Component{

    static propTypes = {
        onDelete: Proptypes.func,
    }


    render = () => {
        var { onDelete, onCommentChange,onArtistNameChange, onSongNameChange } = this.props
        if (!onCommentChange)
            onCommentChange = function(){}
        if (!onArtistNameChange)
            onArtistNameChange = function(){}
        if(!onSongNameChange)
            onSongNameChange = function(){}
          const videoItems = this.props.videos.map( (video, i) => {
            return <PlayerSongListItem
                onVideoSelect = {this.props.onVideoSelect}
                key = {video.etag}
                video = {video}
                onDelete={onDelete}
                onCommentChange={(e, value) => onCommentChange(video, i, value)}
                onArtistNameChange={(e, value) => onArtistNameChange(video, i, value)}
                onSongNameChange={(e, value) => onSongNameChange(video, i, value)}

            />


        })

        return(
            <List className='col-md-4 list-group'>
                {videoItems}
            </List>

        )
    }

}

export default PlayerSongList;
