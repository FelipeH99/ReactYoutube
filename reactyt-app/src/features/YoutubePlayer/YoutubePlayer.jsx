import React from 'react';
import YouTube from 'react-youtube';
import './YoutubePlayer.css';


const YouTubePlayer = ({videoId}) => {
    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 0 ,
        },
    };

    const onReady = (event) => {
        event.target.pauseVideo();
    }

    return <YouTube className='yt' videoId={videoId} opts={opts} onReady={onReady} />;
}

export default YouTubePlayer;

//AIzaSyDiwcdrnpEiLrZzpynoIxEB6NgjkZSKS1A