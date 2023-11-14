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
            <div className='VideoContainer'>
                {videos && videos.length > 0 ? (
                    videos.map((video, index) => (
                        <div className='VideoPlayer' key={index}>
                            <h2>{video.snippet.title}</h2>
                            <YouTubePlayer videoId={video.id.videoId} ></YouTubePlayer>
                        </div>
                    ))
                ) : (
                    <p>No se encontraron videos.</p>
                )}
            </div>
        </div>
    );
}

export default YouTubeSearch;
