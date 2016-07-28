import React from "react"
import RaisedButton from 'material-ui/RaisedButton';
import SongEntry from '../SongEntryPage/SongEntryPage'
import s from './styles.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { StyleSheet } from 'react-look'

const Video_list_item = ( { video, onVideoSelect } ) => {



    const imageUrl = video.snippet.thumbnails.default.url;

    return <li onClick={ () => onVideoSelect(video) } className={styles.listGroupItem}>
        <div className = "video-list-media">
            <div className="media-left">
                <img className = "media-object" src={imageUrl}/>
            </div>

            <div className="media-body">
                <div className ="media-heading">{video.snippet.title}</div>
            </div>
        </div>
    </li>

}

const styles = StyleSheet.create({
    listGroupItem: {
        display: 'table-cell',
        margin: '0 auto',
        textAlign: 'center',

    },
})

export default withStyles(s)(Video_list_item)