import { useState } from 'react';
import { usePizza } from '../context/usePizza';
import './Header.css';

function Header() {
  const { cringeMode, toggleCringeMode, isAdmin, toggleAdmin } = usePizza();
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (toggleAdmin(password)) {
      setShowAdminModal(false);
      setPassword('');
      setLoginError('');
    } else {
      setLoginError('WRONG PASSWORD BUDDY! 🚫🍕');
    }
  };

  return (
    <header className={`header ${cringeMode ? 'cringe' : ''}`}>
      <div className="header-pizza-border top"></div>
      <div className="header-content">
        <div className="logo-section">
          <div className="dom-mascot">🤡</div>
          <h1 className="site-title">
            <span className="dom">DOM'S</span>
            <span className="pizza">PIZZA</span>
            <span className="parlor">PARLOR</span>
          </h1>
          <div className="dom-mascot flip">🍕</div>
        </div>
        
        <p className="tagline">
          🔥 THE MOST CHAOTIC PIZZA COMMUNITY ON THE INTERNET! 🔥
        </p>
        
        <div className="header-controls">
          <button 
            className={`cringe-toggle ${cringeMode ? 'active' : ''}`}
            onClick={toggleCringeMode}
          >
            {cringeMode ? '😵 DISABLE MAX CRINGE' : '🤪 ENABLE MAX CRINGE'}
          </button>
          
          {!isAdmin ? (
            <button 
              className="admin-btn"
              onClick={() => setShowAdminModal(true)}
            >
              🔐 ADMIN LOGIN
            </button>
          ) : (
            <span className="admin-badge">👑 ADMIN MODE</span>
          )}
        </div>
      </div>
      <div className="header-pizza-border bottom"></div>

      {showAdminModal && (
        <div className="modal-overlay" onClick={() => setShowAdminModal(false)}>
          <div className="modal admin-modal" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setShowAdminModal(false)}>✖</button>
            <h2>🔐 ADMIN ACCESS 🔐</h2>
            <p className="modal-subtitle">Enter the secret pizza password!</p>
            <form onSubmit={handleAdminLogin}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password..."
                className="admin-input"
              />
              {loginError && <p className="login-error">{loginError}</p>}
              <button type="submit" className="submit-btn">
                🍕 LOGIN 🍕
              </button>
            </form>
            <p className="hint">Hint: It's pizza + 123</p>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
