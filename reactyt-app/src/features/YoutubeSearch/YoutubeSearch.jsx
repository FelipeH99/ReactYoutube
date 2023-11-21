import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VideoContext } from '../VideoContext/VideoContext';
import YouTubePlayer from '../YoutubePlayer/YoutubePlayer';
import './YoutubeSearch.css';
const YouTubeSearch = () => {

    const [query, setQuery] = useState('');
    const [error, setError] = useState(false);
    const { videosWatchedCount, videos, updateVideos, setMainVideo, mainVideo } = useContext(VideoContext);
    const apikey = "AIzaSyCSNPxOrKhYPPMLZXVcaUeMk9JtGs1Gzbo"
    const apikey2 = 'AIzaSyAMxpgKM8np3dsTLsV_aAFSFUMV7tKnqV0'
    const handleInputChange = (event) => {
        setQuery(event.target.value);
    }

    const searchVideos = () => {
        fetch(`https://www.googleapis.com/youtube/v3/search?q=${query}&type=video&key=${apikey}&part=snippet`)
            .then(response => response.json())
            .then(data => {
                updateVideos(data.items);
                setError(false);
                setMainVideo(data.items[0]);
            })
            .catch(error => {
                console.log(error);
                setError(true);
            });
    }
    const navigate = useNavigate();

    const SideVideo = ({ video, onClick }) => (
        <div className='sideVideo' onClick={onClick}>
            <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
            <span className='titles'>{video.snippet.title}</span>
        </div>
    );

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            searchVideos();
        }
    };
    const handleVideoClick = (video) => {
        setMainVideo(video);
    }
    const handleDetailsClick = (videoId) => {
        updateVideos(videos);
        navigate(`details/${mainVideo.id.videoId}`);
    };


    useEffect(() => {
        if (videos && videos.length > 0) {
            setMainVideo(mainVideo);

        }
    }, [videos, setMainVideo]);

    return (
        <>
            <div className='mainContent'>
                <form className='searchForm' onSubmit={(e) => e.preventDefault()}>
                    <input type="text" value={query} onChange={handleInputChange} onKeyDown={handleKeyDown} placeholder='Buscar...' />
                    <FontAwesomeIcon icon={faSearch} className='searchIcon' />
                    <button onClick={searchVideos} aria-label="Buscar">Buscar</button>
                </form>

                {error && <p className='error-message'>Hubo un error al buscar los videos. Inténtalo de nuevo más tarde.</p>}
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
                            <SideVideo key={index} video={video} onClick={() => handleVideoClick(video)} />
                        )
                    ))}
                    <h2 style={{ fontSize: '1.5rem' }}>Cantidad de videos vistos: {videosWatchedCount}</h2>
                </div>
            </div>
        </>
    );

}


export default YouTubeSearch;