import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './index.css'; // Use the improved CSS

const NotesList = () => {
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('http://localhost:3000/get/notes', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch notes');
        }
        const data = await response.json();
        setNotes(data.notes);
        setFilteredNotes(data.notes);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching notes:', error);
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  useEffect(() => {
    let filtered = notes.filter(note =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.userFirstName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort notes
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    setFilteredNotes(filtered);
  }, [searchTerm, sortBy, notes]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading notes...</p>
      </div>
    );
  }

  return (
    <div className="notes-list-container">
      <div className="notes-header-section">
        <div className="header-content">
          <h1 className="page-title">
            📄 Shared Notes
          </h1>
          <p className="page-subtitle">Discover and share knowledge with the community</p>
        </div>
        
        <button 
          className="add-notes-btn" 
          onClick={() => navigate('/add-notes')}
        >
          ➕ Add Notes
        </button>
      </div>

      <div className="controls-section">
        <div className="search-container">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search notes or authors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="sort-container">
          🔽
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="title">Title A-Z</option>
          </select>
        </div>
      </div>

      <div className="notes-grid">
        {filteredNotes.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h3>No notes found</h3>
            <p>Try adjusting your search or be the first to share your notes!</p>
          </div>
        ) : (
          filteredNotes.map(note => (
            <Link 
              to={`/notes/${note._id}`} 
              className="note-card" 
              key={note._id}
            >
              <div className="note-header">
                <div className="note-icon">
                  📄
                </div>
                <div className="note-subject">{note.subject || 'General'}</div>
              </div>
              
              <h2 className="note-title">{note.title}</h2>
              
              <div className="note-meta">
                <div className="author-info">
                  <span>👤</span>
                  <span>{note.userFirstName}</span>
                </div>
                <div className="date-info">
                  <span>📅</span>
                  <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="note-footer">
                <span className="view-note">View Note →</span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default NotesList;