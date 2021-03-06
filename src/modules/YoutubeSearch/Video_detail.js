import React from "react"

const Video_detail = ( { video }) =>{

    //check before we render video into Video_detail
    if(!video){
        return (<div>Loading...</div>)
    }

    const videoId = video.id.videoId;
    const url = `https://www.youtube.com/embed/${videoId}`;

    return(
        <div className="video-detail col-md-8">
            <div className="embed-responsive embed-responsive-16by9">
                <iframe style={{width: '100%', height: 300}} frameBorder="0" className = "embed-responsive-item" src={url}></iframe>
            </div>

            {(video.snippet && video.snippet.title && video.snippet.description) ? <div className="details">
                <div>{video.snippet.title}</div>
                <div>{video.snippet.description}</div>
            </div> : null}
        </div>
    )
}

export default Video_detail;
