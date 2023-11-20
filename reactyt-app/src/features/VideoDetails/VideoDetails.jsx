import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useVideoContext } from '../VideoContext/VideoContext';
import './VideoDetails.css';

const VideoDetails = () => {
    const { videoId } = useParams();
    const [video, setVideo] = useState(null);
    const apikey = "AIzaSyCSNPxOrKhYPPMLZXVcaUeMk9JtGs1Gzbo";
    const apikey2 = 'AIzaSyAMxpgKM8np3dsTLsV_aAFSFUMV7tKnqV0'
    const { videos, updateVideos } = useVideoContext();

    useEffect(() => {
        if (videos.length > 0) {
            updateVideos(videos);
        }

        fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apikey}&part=snippet,contentDetails,statistics,status`)
            .then(response => response.json())
            .then(data => {
                setVideo(data.items[0]);
            })
            .catch(error => console.log(error));
    }, [videoId, videos, updateVideos]);

    return (
        <>
            <button className='backButton' onClick={() => window.history.back()}>Volver</button>
            <div className='detalles'>

                {video && (
                    <>
                        <img src={video.snippet.thumbnails.standard.url} alt={video.snippet.title} />
                        <h2>{video.snippet.title}</h2>
                        <div className="video-stats">
                            <p>{video.snippet.description}</p>
                            <p>Vistas: {video.statistics.viewCount}</p>
                            <p>Likes: {video.statistics.likeCount}</p>
                            <p>Fecha de Publicación: {new Date(video.snippet.publishedAt).toLocaleDateString()}</p>
                        </div>
                    </>
                )}
            </div>
        </>
    );

}

export default VideoDetails;
