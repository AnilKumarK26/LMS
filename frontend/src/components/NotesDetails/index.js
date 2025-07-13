import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams hook from React Router
import "./index.css"

const NoteDetails = () => {
  const { id } = useParams(); // Get the ID parameter from the URL
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await fetch(`http://localhost:3000/notes/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch note');
        }
        const data = await response.json();
        setNote(data.note);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching note:', error);
      }
    };

    fetchNote();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!note) {
    return <div>Note not found</div>;
  }

  // Function to handle download
  const handleDownload = () => {
    const blob = new Blob([note.description], { type: 'text/plain' }); // Create a new Blob object with the note description
    const url = URL.createObjectURL(blob); // Create a URL for the Blob
    const a = document.createElement('a'); // Create an anchor element
    a.href = url; // Set the anchor's href to the Blob URL
    a.download = `${note.title}.txt`; // Set the download attribute with a default file name
    document.body.appendChild(a); // Append the anchor to the body (required for Firefox)
    a.click(); // Programmatically click the anchor to trigger the download
    document.body.removeChild(a); // Remove the anchor from the DOM
    URL.revokeObjectURL(url); // Clean up the URL.createObjectURL
  };

  return (
    <div className='notes-detailer-container'>
      <h1>Notes Details </h1>
      <div className='container-notes-details'>
        <h1 className='main-heading'>{note.title} - uploaded by {note.userFirstName}</h1>
        <p className='details'>{note.description}</p>
        <p style={{ alignSelf: "flex-start", fontSize: "28px", fontWeight: "700" }}>
          Uploaded at: {new Date(note.createdAt).toLocaleString()}
        </p>
        <button className='download' onClick={handleDownload}>Download</button>
      </div>
    </div>
  );
};

export default NoteDetails;
