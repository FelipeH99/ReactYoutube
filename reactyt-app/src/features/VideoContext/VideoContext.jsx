import React, { createContext, useContext, useState } from 'react';

export const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
    const [videosWatchedCount, setVideosWatchedCount] = useState(0);

    const incrementVideosWatchedCount = () => {
        setVideosWatchedCount((prevCount) => prevCount + 1);
    };

    return (
        <VideoContext.Provider value={{ videosWatchedCount, incrementVideosWatchedCount }}>
            {children}
        </VideoContext.Provider>
    );
};

export const useVideoContext = () => {
    return useContext(VideoContext);
};
