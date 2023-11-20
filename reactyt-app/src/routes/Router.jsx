import * as React from "react";
import { useRoutes } from "react-router-dom";
import VideoDetails from "../features/VideoDetails/VideoDetails";
import YouTubeSearch from "../features/YoutubeSearch/YoutubeSearch";
import Layout from "../layout/Layout";


export default function Router() {
    return useRoutes([
        {
            path: "/ReactYoutube/",
            element: <Layout />,
            children: [
                {
                    path: "/ReactYoutube/",
                    element: <YouTubeSearch />
                    ,
                },
                {
                    path: "/ReactYoutube/details/:videoId",
                    element: <VideoDetails />,
                },
            ],
        },
    ]);
}