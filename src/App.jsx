// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StartPage from './pages/StartPage';
import GalleryPage from './pages/GalleryPage';
import ClusterVennPage from './pages/ClusterVennPage';
import TaskHistoryPage from './pages/TaskHistoryPage';
import ScrollTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
     <ScrollTop/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/start" element={<StartPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/cluster-venn" element={<ClusterVennPage />} />
        <Route path="/task-history" element={<TaskHistoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;