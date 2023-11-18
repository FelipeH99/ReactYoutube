import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import YouTubePlayer from '../YoutubePlayer/YoutubePlayer';
import './VideoDetails.css';

const VideoDetails = () => {
    const { videoId } = useParams();
    const [video, setVideo] = useState(null);
    const apikey = "AIzaSyAMxpgKM8np3dsTLsV_aAFSFUMV7tKnqV0";

    useEffect(() => {
        fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apikey}&part=snippet,contentDetails,statistics,status`)
            .then(response => response.json())
            .then(data => {
                setVideo(data.items[0]);
            })
            .catch(error => console.log(error));
    }, [videoId]);

    return (
        <div className='Detalles'>
            {video && (
                <>
                    <YouTubePlayer videoId={video.id} />
                    <h2>{video.snippet.title}</h2>
                    <p>{video.snippet.description}</p>
                    {/* Aquí puedes agregar más detalles del video como las vistas, los likes, etc. */}
                </>
            )}
        </div>
    );
}

export default VideoDetails;
