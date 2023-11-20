import React, { createContext, useContext, useState } from 'react';

export const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
    const [videosWatchedCount, setVideosWatchedCount] = useState(0);
    const [videos, setVideos] = useState([]);
    const [mainVideo, setMainVideo] = useState(null);

    const incrementVideosWatchedCount = () => {
        setVideosWatchedCount((prevCount) => prevCount + 1);
    };

    const updateVideos = (newVideos) => {
        setVideos(newVideos);
    };

    const setMainVideoFunction = (video) => {
        setMainVideo(video);
    };

    return (
        <VideoContext.Provider
            value={{
                videosWatchedCount,
                incrementVideosWatchedCount,
                videos,
                updateVideos,
                mainVideo,
                setMainVideo: setMainVideoFunction,
            }}
        >
            {children}
        </VideoContext.Provider>
    );
};

export const useVideoContext = () => {
    return useContext(VideoContext);
};