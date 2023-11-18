import * as React from "react";
import { useRoutes } from "react-router-dom";
import VideoDetails from "../features/VideoDetails/VideoDetails";
import YouTubeSearch from "../features/YoutubeSearch/YoutubeSearch";
import YtLayout from "../layout/YtLayout";


export default function Router() {
    return useRoutes([
        {
            path: "/",
            element: <YtLayout />,
            children: [
                {
                    path: "/Home",
                    element: <YouTubeSearch />
                    ,
                },
                {
                    path: "/details/:videoId",
                    element: <VideoDetails />,
                },
            ],
        },
    ]);
}