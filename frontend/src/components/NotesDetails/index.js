import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./index.css";
import { jsPDF } from 'jspdf';

const NoteDetails = () => {
  const { id } = useParams();
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
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  // Enhanced PDF download function using proper PDF generation
  const handleDownload = async () => {
  try {
    const doc = new jsPDF();
    
    // Set margins and page dimensions
    const margin = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const maxWidth = pageWidth - 2 * margin;
    
    let yPosition = 30;
    
    // Add title
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text(note.title, margin, yPosition);
    yPosition += 20;
    
    // Add author and date
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Author: ${note.userFirstName}`, margin, yPosition);
    yPosition += 10;
    doc.text(`Date: ${formatDate(note.createdAt)}`, margin, yPosition);
    yPosition += 20;
    
    // Add content
    doc.setFontSize(11);
    const splitText = doc.splitTextToSize(note.description, maxWidth);
    
    for (let i = 0; i < splitText.length; i++) {
      if (yPosition > pageHeight - 30) {
        doc.addPage();
        yPosition = 30;
      }
      doc.text(splitText[i], margin, yPosition);
      yPosition += 6;
    }
    
    // Save the PDF
    doc.save(`${note.title.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_')}_note.pdf`);
    showNotification('PDF downloaded successfully! 📄', 'success');
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    showNotification('Error generating PDF. Please try again.', 'error');
  }
};

  // Create formatted text content
  const createFormattedTextContent = () => {
    return `
╔════════════════════════════════════════════════════════════╗
║                         NOTE DETAILS                       ║
╚════════════════════════════════════════════════════════════╝

Title: ${note.title}

Author: ${note.userFirstName}
Created: ${formatDate(note.createdAt)}

──────────────────────────────────────────────────────────────

CONTENT:

${note.description}

──────────────────────────────────────────────────────────────
Generated from Notes Application
Date: ${new Date().toLocaleDateString()}
    `;
  };

  // Generic file download function
  const downloadFile = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.style.display = 'none';
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Notification function
  const showNotification = (message, type) => {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  };

  // Format date function
  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (loading) {
    return (
      <div className='notes-detailer-container loading-container'>
        <div className="loading-card">
          <div className="loading-spinner"></div>
          <h2>Loading Note Details...</h2>
          <p>Please wait while we fetch your note</p>
        </div>
      </div>
    );
  }

  if (!note) {
    return (
      <div className='notes-detailer-container error-container'>
        <div className="error-card">
          <div className="error-icon">📄</div>
          <h2>Note Not Found</h2>
          <p>The requested note could not be found or may have been removed.</p>
          <button className="back-btn" onClick={() => window.history.back()}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='notes-detailer-container'>
      {/* Header Section */}
      <div className="page-header">
        <div className="header-icon">👁️</div>
        <h1>Note Details</h1>
        <p>View and download your note content</p>
      </div>

      {/* Main Content Card */}
      <div className='main-content-card'>
        {/* Note Header */}
        <div className="note-header">
          <h2 className='note-title'>{note.title}</h2>
          <div className="note-meta">
            <div className="meta-item">
              <span className="meta-icon">👤</span>
              <span>By {note.userFirstName}</span>
            </div>
            <div className="meta-item">
              <span className="meta-icon">📅</span>
              <span>{formatDate(note.createdAt)}</span>
            </div>
          </div>
        </div>

        {/* Note Content */}
        <div className="note-content-section">
          <div className="content-header">
            <span className="content-icon">📝</span>
            <h3>Content</h3>
          </div>
          <div className='note-description'>
            {note.description}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-section">
          <button className='download-btn' onClick={handleDownload}>
            <span className="btn-icon">⬇️</span>
            Download as PDF
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="page-footer">
        <p>Note created on {new Date(note.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default NoteDetails;