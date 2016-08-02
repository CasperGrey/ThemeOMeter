import React from "react"
import Video_list_item from "./Video_list_item"


class Video_list extends React.Component{

    static propTypes = {
        onDelete: React.PropTypes.func,
    }



    render = () => {
        const { onDelete } = this.props

        const videoItems = this.props.videos.map( video => {
            return <Video_list_item
                onVideoSelect = {this.props.onVideoSelect}
                key = {video.etag}
                video = {video}
                onDelete={onDelete}
            />


        })

        return(
            <ul className='col-md-4 list-group'>
                {videoItems}
            </ul>

        )
    }

}

export default Video_list;