import React, { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';

const NoteModal = ({ isOpen, onClose, onSubmit, editingNote, isLoading }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setDescription(editingNote.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [editingNote, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{editingNote ? 'Edit Note' : 'Create New Note'}</h2>
          <button className="close-btn" onClick={onClose}><X size={24} /></button>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input 
              type="text" 
              id="title" 
              className="input-field" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
              placeholder="Enter note title..."
              autoFocus
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea 
              id="description" 
              className="input-field" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              required 
              placeholder="What's on your mind?"
              rows={5}
              style={{ resize: 'vertical' }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? <Loader2 className="spinner" /> : (editingNote ? 'Save Changes' : 'Create Note')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteModal;
