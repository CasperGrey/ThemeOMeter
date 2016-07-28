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

    static propTypes = {
        onAddVideo: React.PropTypes.func,
    }

    videoSearch(searchTerm) {
        //youtube search
        YTSearch({key: API_KEY, term:searchTerm}, (videos) => {
            this.setState({
                videos:videos,
                selectedVideo: videos[0]
            });
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
        const { onAddVideo } = this.props
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
                />
            </div>
        )
    }
}
//
export default YoutubeSearch