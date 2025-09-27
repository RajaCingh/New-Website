import React, { useEffect, useMemo, useState } from 'react';
import './Gallery.css';

const AUTH_STORAGE_KEY = 'admin_auth_v1';
const GALLERY_STORAGE_KEY = 'uploaded_gallery_images_v1';

const validUsernames = ['rajasingh.com.np', 'rajasingh.com.mp'];
const correctPassword = 'king@0143';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [images, setImages] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved === 'true') setIsAuthenticated(true);
    } catch {}
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    try {
      const raw = localStorage.getItem(GALLERY_STORAGE_KEY);
      const list = raw ? JSON.parse(raw) : [];
      setImages(Array.isArray(list) ? list : []);
    } catch {
      setImages([]);
    }
  }, [isAuthenticated]);

  const onLogin = (e) => {
    e.preventDefault();
    setError('');
    const u = (username || '').trim();
    const p = (password || '').trim();
    if (validUsernames.includes(u) && p === correctPassword) {
      setIsAuthenticated(true);
      try { localStorage.setItem(AUTH_STORAGE_KEY, 'true'); } catch {}
    } else {
      setError('Invalid credentials');
    }
  };

  const onLogout = () => {
    setIsAuthenticated(false);
    try { localStorage.removeItem(AUTH_STORAGE_KEY); } catch {}
  };

  const handleFiles = async (fileList) => {
    const files = Array.from(fileList || []);
    if (files.length === 0) return;
    const newItems = [];
    for (const file of files) {
      if (!file.type.startsWith('image/')) continue;
      const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      newItems.push({ id: `${Date.now()}_${file.name}`, src: dataUrl });
    }
    const next = [...newItems, ...images];
    setImages(next);
    try { localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(next)); } catch {}
  };

  const removeImage = (id) => {
    const next = images.filter((it) => it.id !== id);
    setImages(next);
    try { localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(next)); } catch {}
  };

  if (!isAuthenticated) {
    return (
      <section id="admin" className="gallery section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Admin Login</h2>
            <p className="section-subtitle">Sign in to manage gallery</p>
          </div>
          <form onSubmit={onLogin} className="admin-form">
            <div className="form-row">
              <label>Username</label>
              <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="rajasingh.com.np" />
            </div>
            <div className="form-row">
              <label>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••" />
            </div>
            {error ? <p style={{ color: 'tomato', marginTop: 8 }}>{error}</p> : null}
            <button type="submit" className="nav-link" style={{ marginTop: 12 }}>Login</button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section id="admin" className="gallery section">
      <div className="container">
        <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 className="section-title">Admin Panel</h2>
            <p className="section-subtitle">Upload and manage gallery images</p>
          </div>
          <button className="nav-link" onClick={onLogout}>Logout</button>
        </div>

        <div className="form-row" style={{ marginBottom: 16 }}>
          <input type="file" multiple accept="image/*" onChange={(e) => handleFiles(e.target.files)} />
        </div>

        <div className="gallery-grid">
          {images.length === 0 ? (
            <p>No images uploaded yet.</p>
          ) : (
            images.map((it) => (
              <div key={it.id} className="gallery-item" style={{ position: 'relative' }}>
                <img src={it.src} alt="Uploaded" className="gallery-img" />
                <button
                  className="lightbox-close"
                  style={{ position: 'absolute', top: 6, right: 6 }}
                  onClick={() => removeImage(it.id)}
                  aria-label="Remove"
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Admin;


