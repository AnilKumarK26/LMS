import React, { useState } from 'react';
import './index.css'; 

const NoteForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem('mail');
    if (!email) {
      alert('Email not found in local storage.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description, email })
      });
      const data = await response.json();
      console.log(data);
      
      if (!response.ok) {
        throw new Error('Failed to add note');
      }

      alert('Note added successfully');
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error adding note:', error);
      alert('Failed to add note. Please try again later.');
    }
  };

  return (
    <div className="note-form-page">
      {/* Background decoration */}
      <div className="background-decoration">
        <div className="bg-circle bg-circle-1"></div>
        <div className="bg-circle bg-circle-2"></div>
        <div className="bg-circle bg-circle-3"></div>
      </div>

      {/* Main heading */}
      <div className="page-header">
        <h1 className="main-heading">Add Notes</h1>
        <div className="heading-underline"></div>
      </div>

      {/* Form container */}
      <div className="form-wrapper">
        <div className="form-container">
          {/* Form header */}
          <div className="form-header">
            <div className="form-icon">
              <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h2 className="form-title">My Notes</h2>
            <p className="form-subtitle">Create and organize your thoughts</p>
          </div>

          {/* Form */}
          <form className="note-form" onSubmit={handleSubmit}>
            {/* Title input */}
            <div className="input-group">
              <label className="input-label">Note Title</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter your note title..."
                  required
                  className="form-input"
                />
                <div className="input-icon">
                  <svg className="icon-small" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Description textarea */}
            <div className="input-group">
              <label className="input-label">Description</label>
              <div className="input-wrapper">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write your note description here..."
                  required
                  rows={6}
                  className="form-textarea"
                ></textarea>
                <div className="textarea-icon">
                  <svg className="icon-small" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Submit button */}
            <div className="button-wrapper">
              <button type="submit" className="submit-button">
                <span className="button-overlay"></span>
                <span className="button-content">
                  <svg className="button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Add Note</span>
                </span>
              </button>
            </div>
          </form>

          {/* Decorative elements */}
          <div className="deco-circle deco-circle-1"></div>
          <div className="deco-circle deco-circle-2"></div>
        </div>
      </div>

      {/* Footer decoration */}
      <div className="footer-decoration">
        <div className="footer-dots">
          <div className="dot dot-1"></div>
          <div className="dot dot-2"></div>
          <div className="dot dot-3"></div>
        </div>
      </div>
    </div>
  );
};

export default NoteForm;