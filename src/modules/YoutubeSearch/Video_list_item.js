import React from "react"
import s from './styles.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { StyleSheet } from 'react-look'
import { NavigationClose } from 'material-ui/svg-icons/navigation/check'
import IconButton from 'material-ui/IconButton'


class Video_list_item extends React.Component {

    static propTypes = {
        onDelete: React.PropTypes.func,
    };
    render = () => {
        var {video, onVideoSelect, onDelete} = this.props;
        const imageUrl = video.snippet.thumbnails.default.url;

        if (onVideoSelect == null)
            onVideoSelect = function(){};

        return <li onClick={ () => onVideoSelect(video) } className={styles.listGroupItem}>
            <div className="video-list-media">
                {onDelete ? <div className={styles.deleteButton}>
                    <IconButton onClick={() => onDelete(video)}><NavigationClose color="red" /></IconButton>
                </div> : null}
                <div className="media-left">
                    <img className="media-object" src={imageUrl}/>
                </div>

                <div className="media-body">
                    <div className="media-heading">{video.snippet.title}</div>
                </div>

            </div>
        </li>
    }
}

const styles = StyleSheet.create({
    listGroupItem: {
        float: 'left',
        textAlign: 'center',
        position: 'relative',
        listStyleType: 'none',
        width: 120,
        margin: 10,
        height: 180,
    },
    deleteButton:{
        position: 'absolute',
        top: 0,
        right: 0,
    },
});

export default withStyles(s)(Video_list_item)
