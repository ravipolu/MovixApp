import React from "react";
import ReactPlayer from 'react-player/youtube'
import './VideoPopup.css'


const VideoPopup = ({show, setShow, setVideoId, videoId}) =>{
    const hidePopup = () =>{
        setShow(false);
        setVideoId(null);
    }

    return (
        <div className={`videoPopup ${show ? "visible" : ""}`}>
            <div className="opacityLayer" onClick={hidePopup}></div>
            <div className="videoPlayer">
                <span className="closeBtn" onClick={hidePopup}>
                    Close
                </span>
                <ReactPlayer 
                    url={`https://www.youtube.com/watch?v=${videoId}`}
                    controls
                    width="100%"
                    height="100%"
                />
            </div>
        </div>
    )
}

export default VideoPopup;