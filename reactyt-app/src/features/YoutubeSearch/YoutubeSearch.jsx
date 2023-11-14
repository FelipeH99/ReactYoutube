import { useState } from 'react';
import YouTubePlayer from '../YoutubePlayer/YoutubePlayer';
import './YoutubeSearch.css';

const YouTubeSearch = () => {
    const [query, setQuery] = useState('');
    const [videos, setVideos] = useState([]);
    const [error , setError] = useState(false);

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    }

    const searchVideos = () => {
        fetch(`https://www.googleapis.com/youtube/v3/search?q=${query}&type=video&key=AIzaSyDiwcdrnpEiLrZzpynoIxEB6NgjkZSKS1A&part=snippet`)
            .then(response => response.json())
            .then(data => setVideos(data.items) )
            .catch(error => {
                    console.log(error)
                    setError(true)});
    }

    return (
        <div>
            <div className='SearchForm'>
                <input type="text" value={query} onChange={handleInputChange} />
                <button onClick={()=> {
                    searchVideos();
                }}>Buscar</button>
            </div>
            {error && <p>Hubo un error al buscar los videos</p>}
            {videos && videos.length > 0 ? (
    <div className='VideoContainer'>
        <div className='MainVideo'>
            <YouTubePlayer videoId={videos[0].id.videoId} />
            <h2>{videos[0].snippet.title}</h2>
            <button onClick={()=> {} }>Detalles</button>
        </div>
        <div className='SideVideos'>
            {videos.slice(1, 4).map((video, index) => (
                <div className='VideoPlayer' key={index}>
                    <YouTubePlayer videoId={video.id.videoId} />
                    <h2 style={{ fontSize: '1rem'}}>{video.snippet.title}</h2>
                </div>
                
            ))}
            <h2 style={{ fontSize: '1.5rem'}}>Cantidad de videos vistos:</h2>
        </div>
        </div>
        ) : (
            <p>No se encontraron videos.</p>
        )}
                
    </div>
    );
}

export default YouTubeSearch;
