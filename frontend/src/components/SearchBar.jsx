import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ searchTerm, setSearchTerm, onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', width: '100%', maxWidth: '400px' }}>
      <div style={{ position: 'relative', flex: 1 }}>
        <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
          <Search size={18} />
        </div>
        <input
          type="text"
          className="input-field"
          style={{ paddingLeft: '2.5rem' }}
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-secondary">Search</button>
    </form>
  );
};

export default SearchBar;
