import React, { Component } from "react"
import ReactDOM from "react-dom"
//import lodah
import _ from "lodash"

import YTSearch from 'youtube-api-search'
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Search_bar from "./Search_bar"
import Video_list from "./Video_list"
import Video_detail from "./Video_detail"
import parseTitleString from './../PlayerSongList/parseTitleString'
//variable to hold the API Key
const API_KEY = 'AIzaSyBYf1d1OI9RrbBZ8ox-HppCUqyndH8herc';
import RaisedButton from 'material-ui/RaisedButton';


// Create a new component
// This component should create some html
class YoutubeSearch extends Component{
    constructor(props){
        super(props);
        this.state = {
            videos: [],
            selectedVideo: null
        };

        this.videoSearch('Macarena');
    }

    componentWillMount() {
        //this.context.onSetTitle(title);
    }

    static propTypes = {
        onAddVideo: Proptypes.func,
        allowDelete: Proptypes.bool,
    }

    videoSearch(searchTerm) {

      YTSearch({key: API_KEY, term:searchTerm}, (videos) => {
            videos = videos.map(v => {
              // Create new video objects with the properties you want
              var songInfo = parseTitleString(v.snippet.title)
              return {
                title: songInfo.title,
                artist: songInfo.artist,
                id: v.id,
                snippet: v.snippet,
              }
           })
              this.setState({
                      videos:videos,
                      selectedVideo: videos[0]
                  });
            console.log(this.state.selectedVideo)
        });
    }

    onAddVideo = () => {
        const { selectedVideo } = this.state
        const { onAddVideo } = this.props

        if (onAddVideo){
            onAddVideo(selectedVideo)
        }
    }


    render(){
        const { onAddVideo, allowDelete } = this.props
        const videoSearch = _.debounce( (term) => {this.videoSearch(term)},400)

        return (<div>
                <Search_bar onSearchTermChange={videoSearch} />
                <Video_detail video={this.state.selectedVideo}/>

                <RaisedButton
                    secondary={true}
                    label="Add"
                    onTouchTap={this.onAddVideo}
                />
                <Divider/>
                <Subheader> Your Search Results </Subheader>
                <Video_list
                    onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
                    videos={this.state.videos}
                    onDelete={allowDelete ? this.onDeleteVideo : null}
                />
            </div>
        )
    }
}
//
export default YoutubeSearch
