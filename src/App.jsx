import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import HomePage from './pages/HomePage';
import NotesPage from './pages/NotesPage';
import NoteSinglePage from './pages/NoteSinglePage';
import AboutPage from './pages/AboutPage';
import HobbyPage from './pages/HobbyPage';
import ArchivePage       from './pages/ArchivePage';
import ArticleReadPage   from './pages/ArticleReadPage';

export default function App() {
  return (
    <HelmetProvider>
      {/* Main App Content */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/notes/:id" element={<NoteSinglePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/hobby" element={<HobbyPage />} />
          <Route path="/archive" element={<ArchivePage />} />
          {/* Route artikel — HARUS di bawah semua route spesifik */}
          <Route path="/:category/:slug" element={<ArticleReadPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
