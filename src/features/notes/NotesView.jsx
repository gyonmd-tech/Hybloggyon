'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import NotesHero from '../../components/notes/NotesHero';
import NotesSearch from '../../components/notes/NotesSearch';
import FeaturedNotes from '../../components/notes/FeaturedNotes';
import NotesStream from '../../components/notes/NotesStream';
import ConnectedThoughts from '../../components/notes/ConnectedThoughts';
import CurrentThinking from '../../components/notes/CurrentThinking';
import RandomThought from '../../components/notes/RandomThought';

export default function NotesView({ posts }) {
  const [activeTag, setActiveTag] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <div className="grain-overlay-body" aria-hidden="true" />

      <Header />

      <main>
        <NotesHero />
        <NotesSearch
          posts={posts}
          onSearch={setSearchQuery}
          onTagSelect={setActiveTag}
          activeTag={activeTag}
        />
        <div style={{ position: 'relative', zIndex: 10, backgroundColor: 'var(--color-background-ash)' }}>
          <FeaturedNotes posts={posts} />
          <NotesStream posts={posts} activeTag={activeTag} searchQuery={searchQuery} />
          <ConnectedThoughts />
          <CurrentThinking />
          <RandomThought />
        </div>
      </main>

      <div style={{ position: 'relative', zIndex: 10 }}>
        <Footer />
      </div>
    </>
  );
}
