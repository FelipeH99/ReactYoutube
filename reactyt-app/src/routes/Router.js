import * as React from "react";
import { useRoutes } from "react-router-dom";
import Home from "../features/Home/Home";
import VideoDetails from "../features/VideoDetails/VideoDetails";
import Layout from "../layout/Layout";


export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <Layout />,
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
