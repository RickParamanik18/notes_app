import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

const NoteCard = ({ note, onEdit, onDelete, isDeleting }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div style={{
      background: 'var(--bg-card)',
      borderRadius: 'var(--radius-lg)',
      padding: '1.5rem',
      boxShadow: 'var(--shadow-md)',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      transition: 'var(--transition)',
      border: '1px solid var(--border)'
    }}
    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0, wordBreak: 'break-word' }}>{note.title}</h3>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            className="btn btn-secondary" 
            style={{ padding: '0.25rem 0.5rem' }} 
            onClick={() => onEdit(note)}
            title="Edit"
          >
            <Pencil size={16} />
          </button>
          <button 
            className="btn btn-danger" 
            style={{ padding: '0.25rem 0.5rem' }} 
            onClick={() => onDelete(note._id)}
            title="Delete"
            disabled={isDeleting}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <p style={{ color: 'var(--text-muted)', flex: 1, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
        {note.description}
      </p>
      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'right', borderTop: '1px solid var(--border)', paddingTop: '0.75rem' }}>
        {formatDate(note.createdAt)}
      </div>
    </div>
  );
};

export default NoteCard;
