import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VideoContext } from '../VideoContext/VideoContext';
import YouTubePlayer from '../YoutubePlayer/YoutubePlayer';
import './YoutubeSearch.css';

const YouTubeSearch = () => {

    const [query, setQuery] = useState('');
    const [videos, setVideos] = useState([]);
    const [mainVideo, setMainVideo] = useState(null);
    const [error, setError] = useState(false);
    const { videosWatchedCount, incrementVideosWatchedCount } = useContext(VideoContext); // Nuevo estado para el contador
    const apikey = "AIzaSyCSNPxOrKhYPPMLZXVcaUeMk9JtGs1Gzbo"
    //const apikey = 'AIzaSyAMxpgKM8np3dsTLsV_aAFSFUMV7tKnqV0'
    const handleInputChange = (event) => {
        setQuery(event.target.value);
    }

    const searchVideos = () => {
        fetch(`https://www.googleapis.com/youtube/v3/search?q=${query}&type=video&key=${apikey}&part=snippet`)
            .then(response => response.json())
            .then(data => {
                setVideos(data.items);
                setMainVideo(data.items[0]);
                localStorage.setItem('videos', JSON.stringify(data.items)); // Guardar videos en localStorage
            })
            .catch(error => {
                console.log(error);
                setError(true);
            });
    }
    const navigate = useNavigate();

    const handleDetailsClick = (videoId) => {
        navigate(`/details/${videoId}`);
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            searchVideos();
        }
    };
    const handleVideoClick = (video) => {
        setMainVideo(video);
    }

    useEffect(() => {
        const storedVideos = JSON.parse(localStorage.getItem('videos'));
        if (storedVideos) {
            setVideos(storedVideos);
            setMainVideo(storedVideos[0]);
        }
    }, []);

    return (
        <>
            <form className='searchForm' onSubmit={(e) => e.preventDefault()}>
                <input type="text" value={query} onChange={handleInputChange} onKeyDown={handleKeyDown} placeholder='Buscar...' />
                <FontAwesomeIcon icon={faSearch} className='searchIcon' />
                <button onClick={searchVideos}>Buscar</button>
            </form>
            <div className='mainContent'>
                {error && <p>Hubo un error al buscar los videos</p>}
                {mainVideo && (
                    <>
                        <YouTubePlayer videoId={mainVideo.id.videoId} />
                        <div className='videoData'>
                            <h2>{mainVideo.snippet.title}</h2>
                            <button onClick={() => handleDetailsClick(mainVideo.id.videoId)}>Detalles</button>
                        </div>
                    </>
                )}
                <div className='sideVideoPanel'>
                    {videos && videos.length > 0 && videos.slice(1, 5).map((video, index) => (
                        index !== 0 && (
                            <div className='sideVideo' key={index} onClick={() => handleVideoClick(video)}>
                                <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
                                <span className='titles'>{video.snippet.title}</span>
                            </div>
                        )
                    ))}
                    <h2 style={{ fontSize: '1.5rem' }}>Cantidad de videos vistos: {videosWatchedCount}</h2>
                </div>
            </div>
        </>
    );
}

export default YouTubeSearch;