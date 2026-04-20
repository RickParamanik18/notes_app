import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { BookText, LogOut } from 'lucide-react';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="app-header">
      <div className="container header-content">
        <div className="header-title">
          <BookText size={28} />
          <span>MiniNotes</span>
        </div>
        {user && (
          <button className="btn btn-secondary" onClick={logout} title="Logout">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
