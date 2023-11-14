import { useState } from 'react';
import YouTubePlayer from '../YoutubePlayer/YoutubePlayer';
import './YoutubeSearch.css';

const YouTubeSearch = () => {
    const [query, setQuery] = useState('');
    const [videos, setVideos] = useState([]);
    const [mainVideo, setMainVideo] = useState(null);
    const [error, setError] = useState(false);

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    }

    const searchVideos = () => {
        fetch(`https://www.googleapis.com/youtube/v3/search?q=${query}&type=video&key=AIzaSyDiwcdrnpEiLrZzpynoIxEB6NgjkZSKS1A&part=snippet`)
            .then(response => response.json())
            .then(data => {
                setVideos(data.items);
                setMainVideo(data.items[0]);
            })
            .catch(error => {
                console.log(error);
                setError(true);
            });
    }

    const handleVideoClick = (video) => {
        setMainVideo(video);
    }
    // className='contSearch'
    return (
        <>
            <div className='SearchForm'>
                <input type="text" value={query} onChange={handleInputChange} />
                <button onClick={searchVideos}>Buscar</button>
            </div>
            <div className='mainContent'>

                {error && <p>Hubo un error al buscar los videos</p>}
                {mainVideo && (
                    <>
                        <YouTubePlayer videoId={mainVideo.id.videoId} />
                        <div className='videoData'>
                            <h2>{mainVideo.snippet.title}</h2>
                            <button onClick={() => { }}>Detalles</button>
                        </div>
                    </>


                )}
                <div className='SideVideos'>
                    {videos && videos.length > 0 && videos.slice(1, 5).map((video, index) => (
                        index !== 0 && (
                            <div className='sideVideo' key={index} onClick={() => handleVideoClick(video)}>
                                <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
                                <span>{video.snippet.title}</span>

                            </div>

                        )
                    ))}
                    <h2 style={{ fontSize: '1.5rem' }}>Cantidad de videos vistos:</h2>
                </div>
            </div>
        </>
    );
}

export default YouTubeSearch;
