import React from "react"
import PlayerSongListItem from "./PlayerSongListItem"
import List from 'material-ui/List'

class PlayerSongList extends React.Component{

    static propTypes = {
        onDelete: React.PropTypes.func,
    }



    render = () => {
        const { onDelete } = this.props

        const videoItems = this.props.videos.map( video => {
            return <PlayerSongListItem
                onVideoSelect = {this.props.onVideoSelect}
                key = {video.etag}
                video = {video}
                onDelete={onDelete}
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