// App.js
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './App.css';
import { VideoProvider } from './features/VideoContext/VideoContext';
import Router from './routes/Router';

function App() {
  return (
    <VideoProvider>
      <Router />
    </VideoProvider>

  );
}

export default App;
