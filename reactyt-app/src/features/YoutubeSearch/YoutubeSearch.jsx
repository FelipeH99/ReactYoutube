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
            <img src={video.snippet.thumbnails.high.url} alt={video.snippet.title} />
        </div>
    );

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            searchVideos();
        }
    };
    const handleVideoClick = (clickedVideo) => {
        // Set the clicked video as the new main video
        setMainVideo(clickedVideo);

        // Find the index of the clicked video in the videos array
        const clickedIndex = videos.findIndex(v => v.id.videoId === clickedVideo.id.videoId);

        // Update the videos array by replacing the clicked video with the previous main video
        if (clickedIndex !== -1) {
            const updatedVideos = [...videos];
            updatedVideos[clickedIndex] = mainVideo;
            updateVideos(updatedVideos);
        }
    }
    const handleDetailsClick = (videoId) => {
        updateVideos(videos);
        navigate(`details/${mainVideo.id.videoId}`);
    };


    useEffect(() => {
        if (videos && videos.length > 0) {
            setMainVideo(mainVideo);


        }
    }, [videos, setMainVideo, mainVideo]);

    return (
        <>
            <div className="topPanel">
                <form className='searchForm' onSubmit={(e) => e.preventDefault()}>
                    <input type="text" value={query} onChange={handleInputChange} onKeyDown={handleKeyDown} placeholder='Buscar...' />
                    <FontAwesomeIcon icon={faSearch} className='searchIcon' />
                </form>
                <button className='searchButton' onClick={searchVideos} aria-label="Buscar">
                    Buscar
                </button>
            </div>
            <div className='mainContent'>
                <div className='leftPanel'>
                    <div className='videosPanel'>
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
                    </div>
                </div>
                <div className='sideVideoPanel'>
                    {videos && videos.length > 0 && videos.slice(1, 5).map((video, index) => (
                        index !== 0 && (
                            <SideVideo key={index} video={video} onClick={() => {
                                handleVideoClick(video);
                            }} />
                        )
                    ))}
                    <span className='watchCount' style={{ fontSize: '1.5rem' }}>Cantidad de videos vistos: {videosWatchedCount}</span>
                </div>

            </div >
        </>
    );

}


export default YouTubeSearch;