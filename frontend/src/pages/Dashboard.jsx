import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import NoteCard from '../components/NoteCard';
import NoteModal from '../components/NoteModal';
import { Plus, Loader2 } from 'lucide-react';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const fetchNotes = async (search = '') => {
    setIsFetching(true);
    try {
      const url = search ? `${import.meta.env.VITE_API_URL}/notes?search=${encodeURIComponent(search)}` : `${import.meta.env.VITE_API_URL}/notes`;
      const res = await axios.get(url);
      setNotes(res.data);
    } catch (err) {
      console.error('Failed to fetch notes', err);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSearch = () => {
    fetchNotes(searchTerm);
  };

  const handleOpenCreate = () => {
    setEditingNote(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  const handleSubmitNote = async (data) => {
    setIsSubmitting(true);
    try {
      if (editingNote) {
        const res = await axios.put(`${import.meta.env.VITE_API_URL}/notes/${editingNote._id}`, data);
        setNotes(notes.map(n => n._id === editingNote._id ? res.data : n));
      } else {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/notes`, data);
        setNotes([res.data, ...notes]);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error('Failed to save note', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;
    setDeletingId(id);
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/notes/${id}`);
      setNotes(notes.filter(n => n._id !== id));
    } catch (err) {
      console.error('Failed to delete note', err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="app-layout">
      <Header />
      <main className="main-content container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={handleSearch} />
          <button className="btn btn-primary" onClick={handleOpenCreate}>
            <Plus size={18} />
            <span>New Note</span>
          </button>
        </div>

        {isFetching ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0' }}>
            <Loader2 className="spinner" size={40} style={{ width: '40px', height: '40px' }} />
          </div>
        ) : notes.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
            <h3>No notes found</h3>
            <p>Check your search query or create a new note.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {notes.map(note => (
              <NoteCard 
                key={note._id} 
                note={note} 
                onEdit={handleOpenEdit} 
                onDelete={handleDelete}
                isDeleting={deletingId === note._id}
              />
            ))}
          </div>
        )}
      </main>

      <NoteModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleSubmitNote}
        editingNote={editingNote}
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default Dashboard;
