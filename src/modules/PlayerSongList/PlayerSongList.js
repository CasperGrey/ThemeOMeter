import React from "react"
import PlayerSongListItem from "./PlayerSongListItem"
import List from 'material-ui/List'


class PlayerSongList extends React.Component{

    static propTypes = {
        onDelete: React.PropTypes.func,
    }


    render = () => {
        var { onDelete, onCommentChange } = this.props
        if (!onCommentChange)
            onCommentChange = function(){}
        const videoItems = this.props.videos.map( (video, i) => {
            return <PlayerSongListItem
                onVideoSelect = {this.props.onVideoSelect}
                key = {video.etag}
                video = {video}
                onDelete={onDelete}
                onCommentChange={(e, value) => onCommentChange(video, i, value)}
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