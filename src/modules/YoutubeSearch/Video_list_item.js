import React from "react"
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';

const Video_list_item = ( { video, onVideoSelect } ) => {

    const imageUrl = video.snippet.thumbnails.default.url;

    return <li onClick={ () => onVideoSelect(video) } className="list-group-item">
        <div className = "video-list-media">
            <div className="media-left">
                <img className = "media-object" src={imageUrl}/>
            </div>

            <div className="media-body">
                <div className ="media-heading">{video.snippet.title}</div>
                <IconButton tooltip="Font Icon">
                    <FontIcon className="muidocs-icon-action-home" />
                </IconButton>
                <RaisedButton
                    secondary={true}
                    label="Add"
                   />

            </div>
        </div>
    </li>

}

export default Video_list_item;