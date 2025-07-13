import React, { useState } from 'react';
import './index.css'; // Import your CSS file for styling

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
       const data = await response.json()
       console.log(data)
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
<div className='note-form-container'>
    <h1 className='add-notes-heading'>Add Notes</h1>
    <form className="note-form" onSubmit={handleSubmit}>
        <h1>My Notes</h1>
      <input
        type="text"
        className="note-input"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className="note-input"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      ></textarea>
      <button className="add-button" type="submit">
        Add
      </button>
    </form>
    </div>
  );
};

export default NoteForm;
