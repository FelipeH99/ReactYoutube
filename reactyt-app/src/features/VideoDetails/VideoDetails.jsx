import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './VideoDetails.css';

const VideoDetails = () => {
    const { videoId } = useParams();
    const [video, setVideo] = useState(null);
    const apikey = "AIzaSyCSNPxOrKhYPPMLZXVcaUeMk9JtGs1Gzbo";

    useEffect(() => {
        fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apikey}&part=snippet,contentDetails,statistics,status`)
            .then(response => response.json())
            .then(data => {
                setVideo(data.items[0]);
            })
            .catch(error => console.log(error));
    }, [videoId]);

    return (
        <>
            <button onClick={() => window.history.back()}>Volver</button>
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
                            {/* Puedes agregar más detalles según tus necesidades */}
                        </div>
                    </>
                )}
            </div>
        </>
    );

}

export default VideoDetails;
