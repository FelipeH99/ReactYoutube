import * as React from "react";
import { useRoutes } from "react-router-dom";
import Home from "../features/Home/Home";
import VideoDetails from "../features/VideoDetails/VideoDetails";
import YtLayout from "../layout/YtLayout";


export default function Router() {
    return useRoutes([
        {
            path: "/",
            element: <YtLayout />,
            children: [
                {
                    path: "/Home",
                    element: <Home />,
                },
                {
                    path: "/VideoDetails",
                    element: <VideoDetails />,
                },
            ],
        },
    ]);
}