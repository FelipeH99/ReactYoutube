import { useContext, useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import { VideoContext } from '../VideoContext/VideoContext';

const YouTubePlayer = ({ videoId }) => {
    const opts = {
        height: 'auto',
        width: '75%',
        playerVars: {
            autoplay: 0,
        },
    };
    useEffect(() => {
        setFirstplay(true);
    }, [videoId]);
    const [firstPlay, setFirstplay] = useState(true);

    const { incrementVideosWatchedCount } = useContext(VideoContext);
    const onReady = (event) => {
        event.target.pauseVideo();
    }
    const onPlay = (event) => {
        if (firstPlay) {
            incrementVideosWatchedCount();
            setFirstplay(false);
        }
    }

    return <YouTube className='yt' videoId={videoId} opts={opts} onReady={onReady} onPlay={onPlay} />;
}

export default YouTubePlayer;