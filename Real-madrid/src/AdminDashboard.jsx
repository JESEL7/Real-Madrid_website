import React, { useEffect, useRef, useState } from 'react';
import './AdminDashboard.css';
import realMadridLogo from './assets/real-madrid-logo.png';
import { useNavigate } from 'react-router-dom';
import Squad from './Squad.jsx';

// Admin Navbar (same as App.jsx but without sign-in/login)
function AdminNavbar() {
  const navigate = useNavigate();
  return (
    <section id="home">
      <nav className="navbar">
        <div>
          <img src={realMadridLogo} alt="Real Madrid Logo" className="rm-logo-fixed" />
          <h1 className='clubname'>Real Madrid C.F</h1>
        </div>
        <div className="navbar-list">
          <div className="navbar-center">
            <ul>
              <li><a href="#home" onClick={e => { e.preventDefault(); navigate('/'); }}>Home</a></li>
              <li><a href="#news" onClick={e => { e.preventDefault(); navigate('/#news'); }}>News</a></li>
              <li><a href="#squad" onClick={e => { e.preventDefault(); navigate('/#squad'); }}>Squad</a></li>
              <li><a href="#fixtures" onClick={e => { e.preventDefault(); navigate('/#fixtures'); }}>Fixtures</a></li>
              <li><a href="#achievements" onClick={e => { e.preventDefault(); navigate('/#achievements'); }}>Achievements</a></li>
        
            </ul>
          </div>
          {/* No navbar-right (no sign-in/login) */}
        </div>
      </nav>
    </section>
  );
}

function getImageSrc(img) {
  if (!img) return '';
  if (img.startsWith('data:image')) return img;
  return `data:image/jpeg;base64,${img}`;
}

function EditableSquadCard({ player, onChange, onDelete, isSelected, onSelect }) {
  const uploadInputRef = useRef(null);

  const handleUploadClick = (e) => {
    e.stopPropagation();
    uploadInputRef.current.value = '';
    uploadInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      onChange({ ...player, image: ev.target.result });
    };
    reader.readAsDataURL(file);
  };

  const isCoach = player.position?.toLowerCase() === 'coach';

  return (
    <div
      className="squad-card"
      style={{
        border: isSelected ? '2px solid #646cff' : undefined,
        cursor: 'pointer',
        position: 'relative'
      }}
      onClick={onSelect}
    >
      <input
        ref={uploadInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <img
        src={getImageSrc(player.image)}
        alt={player.name}
        className="squad-image"
        style={{ cursor: 'pointer' }}
      />
      <button
        type="button"
        className="admin-news-upload-btn"
        style={{ position: 'absolute', bottom: 16, left: 16, zIndex: 2 }}
        onClick={handleUploadClick}
      >
        Upload Image
      </button>
      <button
        type="button"
        className="admin-news-delete-btn"
        style={{ position: 'absolute', top: 16, right: 16, zIndex: 2 }}
        onClick={e => { e.stopPropagation(); onDelete(); }}
      >
        &#10006;
      </button>
      <div className="squad-info">
        {/* Only show number if not coach */}
        {!isCoach && (
          <input
            type="text"
            value={player.number || ''}
            onChange={e => onChange({ ...player, number: e.target.value })}
            placeholder="Number"
            style={{
              fontSize: '1.6rem',
              fontWeight: 'bold',
              background: 'transparent',
              border: 'none',
              color: '#fff',
              width: '100%',
              outline: 'none'
            }}
          />
        )}
        <input
          type="text"
          value={player.name || ''}
          onChange={e => onChange({ ...player, name: e.target.value })}
          placeholder="Name"
          style={{
            fontSize: '1.2rem',
            fontWeight: 600,
            marginTop: '0.2rem',
            background: 'transparent',
            border: 'none',
            color: '#fff',
            width: '100%',
            outline: 'none'
          }}
        />
        <input
          type="text"
          value={player.position || ''}
          onChange={e => onChange({ ...player, position: e.target.value })}
          placeholder="Position"
          style={{
            fontSize: '0.9rem',
            opacity: 0.8,
            background: 'transparent',
            border: 'none',
            color: '#fff',
            width: '100%',
            outline: 'none'
          }}
        />
      </div>
      <div className="squad-stats-overlay">
        <div className="stat-row">
          <span>Matches</span>
          <input
            type="number"
            value={player.matches ?? ''}
            onChange={e => onChange({ ...player, matches: e.target.value })}
            style={{ width: 50, background: 'transparent', border: 'none', color: '#fff', textAlign: 'right', outline: 'none' }}
            placeholder="-"
          />
        </div>
        {player.position?.toLowerCase() === 'goalkeeper' ? (
          <>
            <div className="stat-row">
              <span>Saves</span>
              <input
                type="number"
                value={player.saves ?? ''}
                onChange={e => onChange({ ...player, saves: e.target.value })}
                style={{ width: 50, background: 'transparent', border: 'none', color: '#fff', textAlign: 'right', outline: 'none' }}
                placeholder="-"
              />
            </div>
            <div className="stat-row">
              <span>Minutes</span>
              <input
                type="number"
                value={player.minutes ?? ''}
                onChange={e => onChange({ ...player, minutes: e.target.value })}
                style={{ width: 50, background: 'transparent', border: 'none', color: '#fff', textAlign: 'right', outline: 'none' }}
                placeholder="-"
              />
            </div>
            <div className="stat-row">
              <span>Goals Conceded</span>
              <input
                type="number"
                value={player.goalsConceded ?? ''}
                onChange={e => onChange({ ...player, goalsConceded: e.target.value })}
                style={{ width: 50, background: 'transparent', border: 'none', color: '#fff', textAlign: 'right', outline: 'none' }}
                placeholder="-"
              />
            </div>
          </>
        ) : player.position?.toLowerCase() === 'coach' ? (
          <>
            <div className="stat-row">
              <span>Wins</span>
              <input
                type="number"
                value={player.wins ?? ''}
                onChange={e => onChange({ ...player, wins: e.target.value })}
                style={{ width: 50, background: 'transparent', border: 'none', color: '#fff', textAlign: 'right', outline: 'none' }}
                placeholder="-"
              />
            </div>
            <div className="stat-row">
              <span>Draws</span>
              <input
                type="number"
                value={player.draws ?? ''}
                onChange={e => onChange({ ...player, draws: e.target.value })}
                style={{ width: 50, background: 'transparent', border: 'none', color: '#fff', textAlign: 'right', outline: 'none' }}
                placeholder="-"
              />
            </div>
            <div className="stat-row">
              <span>Loses</span>
              <input
                type="number"
                value={player.loses ?? ''}
                onChange={e => onChange({ ...player, loses: e.target.value })}
                style={{ width: 50, background: 'transparent', border: 'none', color: '#fff', textAlign: 'right', outline: 'none' }}
                placeholder="-"
              />
            </div>
          </>
        ) : (
          <>
            <div className="stat-row">
              <span>Goals</span>
              <input
                type="number"
                value={player.goals ?? ''}
                onChange={e => onChange({ ...player, goals: e.target.value })}
                style={{ width: 50, background: 'transparent', border: 'none', color: '#fff', textAlign: 'right', outline: 'none' }}
                placeholder="-"
              />
            </div>
            <div className="stat-row">
              <span>Minutes</span>
              <input
                type="number"
                value={player.minutes ?? ''}
                onChange={e => onChange({ ...player, minutes: e.target.value })}
                style={{ width: 50, background: 'transparent', border: 'none', color: '#fff', textAlign: 'right', outline: 'none' }}
                placeholder="-"
              />
            </div>
            <div className="stat-row">
              <span>Assists</span>
              <input
                type="number"
                value={player.assists ?? ''}
                onChange={e => onChange({ ...player, assists: e.target.value })}
                style={{ width: 50, background: 'transparent', border: 'none', color: '#fff', textAlign: 'right', outline: 'none' }}
                placeholder="-"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function EditableSquadSection() {
  const [players, setPlayers] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(null);

  useEffect(() => {
    fetch('/api/squad')
      .then(res => res.json())
      .then(data => setPlayers(Array.isArray(data) ? data : []));
  }, []);

  const handlePlayerChange = (idx, updated) => {
    const player = players[idx];
    if (!player || !player._id) return;
    fetch(`/api/squad/${player._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    })
      .then(res => {
        if (!res.ok) throw new Error();
        setPlayers(players => {
          const arr = [...players];
          arr[idx] = { ...arr[idx], ...updated };
          return arr;
        });
      });
  };

  const handleDelete = (idx) => {
    const player = players[idx];
    if (!player || !player._id) return;
    fetch(`/api/squad/${player._id}`, { method: 'DELETE' })
      .then(res => {
        if (!res.ok) throw new Error();
        setPlayers(players => {
          const arr = [...players];
          arr.splice(idx, 1);
          return arr;
        });
      });
  };

  // Group by position (same as Squad.jsx)
  const groupBy = (arr, key) =>
    arr.reduce((acc, item) => {
      let pos = (item[key] || '').toLowerCase().replace(/s$/, '');
      acc[pos] = acc[pos] || [];
      acc[pos].push(item);
      return acc;
    }, {});

  const grouped = groupBy(players, 'position');

  return (
    <div>
      <h1 className="squad-main-heading">Squad (Editable)</h1>
      {['goalkeeper', 'defender', 'midfielder', 'forward', 'coach'].map(pos =>
        grouped[pos] ? (
          <div className="squad-section" key={pos}>
            <h2 className="squad-title">{pos.charAt(0).toUpperCase() + pos.slice(1)}</h2>
            <div className="squad-wrapper">
              <div className="squad-scroll">
                {grouped[pos].map((player, idx) => (
                  <EditableSquadCard
                    key={player._id}
                    player={player}
                    onChange={updated => handlePlayerChange(players.indexOf(player), updated)}
                    onDelete={() => handleDelete(players.indexOf(player))}
                    isSelected={selectedIdx === players.indexOf(player)}
                    onSelect={() => setSelectedIdx(players.indexOf(player))}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : null
      )}
    </div>
  );
}

function AdminDashboard() {
  const [newsData, setNewsData] = useState([]);
  const uploadInputRef = useRef(null);
  const [selectedNewsIdx, setSelectedNewsIdx] = useState(0);
  const [showAddMainNews, setShowAddMainNews] = useState(false);
  const [newMainNews, setNewMainNews] = useState({ title: '', text: '', img: '' });

  // Fetch all news from DB
  useEffect(() => {
    fetch('/api/news')
      .then(res => res.json())
      .then(data => {
        setNewsData(Array.isArray(data) ? data : []);
        // If no main news, show add form
        if (!data || !data.some(n => n.role === 'main')) setShowAddMainNews(true);
        else setShowAddMainNews(false);
      })
      .catch(() => {});
  }, []);

  // Update news in DB and local state
  const handleNewsChange = (idx, updated) => {
    const news = newsData[idx];
    if (!news || !news._id) return;
    fetch(`/api/news/${news._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: updated.title,
        text: updated.text,
        img: updated.img
      })
    })
      .then(res => {
        if (!res.ok) throw new Error();
        setNewsData(newsData => {
          const arr = [...newsData];
          arr[idx] = { ...arr[idx], ...updated };
          return arr;
        });
      })
      .catch(() => {});
  };

  // Delete news in DB and local state
  const handleDelete = (idx) => {
    const news = newsData[idx];
    if (!news || !news._id) return;
    fetch(`/api/news/${news._id}`, { method: 'DELETE' })
      .then(res => {
        if (!res.ok) throw new Error();
        setNewsData(newsData => {
          const arr = [...newsData];
          arr.splice(idx, 1);
          // If main news deleted, show add form and do not shift up small cards
          if (idx === 0) setShowAddMainNews(true);
          return arr;
        });
      })
      .catch(() => {});
  };

  // Single upload handler for all cards
  const handleUploadClick = () => {
    if (uploadInputRef.current) {
      uploadInputRef.current.value = '';
      uploadInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const idx = selectedNewsIdx;
    const news = newsData[idx];
    if (!news || !news._id) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      handleNewsChange(idx, {
        ...news,
        img: ev.target.result
      });
    };
    reader.readAsDataURL(file);
  };

  // Card click handler to select which card to upload image for
  const handleCardSelect = (idx) => {
    setSelectedNewsIdx(idx);
  };

  // Add new main news to DB (with role: 'main')
  const handleAddMainNews = () => {
    fetch('/api/news', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newMainNews, role: 'main' })
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.id) {
          setNewsData(newsData => [{ ...newMainNews, _id: data.id, role: 'main' }, ...newsData]);
          setShowAddMainNews(false);
          setNewMainNews({ title: '', text: '', img: '' });
        }
      });
  };

  // Handle image upload for new main news
  const handleNewMainNewsImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setNewMainNews(n => ({ ...n, img: ev.target.result }));
    };
    reader.readAsDataURL(file);
  };

  // Find main and side news by role
  const mainNews = newsData.find(n => n.role === 'main');
  const side1 = newsData.find(n => n.role === 'side1');
  const side2 = newsData.find(n => n.role === 'side2');
  const side3 = newsData.find(n => n.role === 'side3');
  const side4 = newsData.find(n => n.role === 'side4');
  // Any other news (fallback)
  const others = newsData.filter(
    n => !['main', 'side1', 'side2', 'side3', 'side4'].includes(n.role)
  );
  // Compose the small news cards in order
  const smallNews = [side1, side2, side3, side4]
    .map((item, idx) => item || others[idx])
    .filter(Boolean);

  return (
    <div className="admin-dashboard" style={{ padding: 40, position: 'relative', minHeight: '100vh' }}>
      <AdminNavbar />
      <section style={{ marginTop: 100 }}>
        <h2>News Section (Editable)</h2>
        {/* Single hidden file input for all cards */}
        <input
          ref={uploadInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <div>
          {/* Main News Card or Add Main News Form */}
          {showAddMainNews ? (
            <div className="main-card-news" style={{ position: 'relative', minHeight: 340, display: 'flex', alignItems: 'stretch' }}>
              <div
                className="main-card-news-img"
                style={{
                  backgroundImage: newMainNews.img ? `url(${getImageSrc(newMainNews.img)})` : undefined,
                  minHeight: 447,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="add-main-news-img"
                  onChange={handleNewMainNewsImage}
                />
                <label
                  htmlFor="add-main-news-img"
                  className="admin-news-upload-btn"
                  style={{ position: 'absolute', bottom: 16, left: 16, zIndex: 2, cursor: 'pointer' }}
                >
                  Upload Image
                </label>
              </div>
              <div className="main-card-news-content">
                <input
                  type="text"
                  value={newMainNews.title}
                  onChange={e => setNewMainNews(n => ({ ...n, title: e.target.value }))}
                  placeholder="Title"
                  className="admin-news-title main"
                  style={{
                    fontSize: '2rem',
                    fontWeight: 600,
                    marginBottom: '1rem',
                    border: '1px solid #ccc',
                    borderRadius: 6,
                    padding: '0.5rem',
                    width: '100%',
                  }}
                />
                <textarea
                  value={newMainNews.text}
                  onChange={e => setNewMainNews(n => ({ ...n, text: e.target.value }))}
                  placeholder="Description"
                  rows={5}
                  className="admin-news-desc"
                  style={{
                    fontSize: '1.1rem',
                    width: '100%',
                    border: '1px solid #ccc',
                    borderRadius: 6,
                    padding: '0.5rem',
                    resize: 'vertical',
                  }}
                />
                <button
                  type="button"
                  className="admin-news-upload-btn"
                  style={{ marginTop: 24, width: 180 }}
                  onClick={handleAddMainNews}
                  disabled={!newMainNews.title || !newMainNews.text || !newMainNews.img}
                >
                  Add Main News
                </button>
              </div>
            </div>
          ) : (
            mainNews && (
              <div
                className="main-card-news"
                style={{ position: 'relative', border: selectedNewsIdx === 0 ? '2px solid #646cff' : undefined, cursor: 'pointer' }}
                onClick={() => handleCardSelect(0)}
              >
                <div
                  className="main-card-news-img"
                  style={{
                    backgroundImage: mainNews.img ? `url(${getImageSrc(mainNews.img)})` : undefined,
                  }}
                >
                  <button
                    type="button"
                    className="admin-news-delete-btn"
                    style={{ position: 'absolute', top: 16, right: 16 }}
                    onClick={e => { e.stopPropagation(); handleDelete(newsData.indexOf(mainNews)); }}
                  >
                    &#10006;
                  </button>
                </div>
                <div className="main-card-news-content">
                  <input
                    type="text"
                    value={mainNews.title}
                    onChange={e => handleNewsChange(newsData.indexOf(mainNews), { ...mainNews, title: e.target.value })}
                    placeholder="Title"
                    className="admin-news-title main"
                    style={{
                      fontSize: '2rem',
                      fontWeight: 600,
                      marginBottom: '1rem',
                      border: '1px solid #ccc',
                      borderRadius: 6,
                      padding: '0.5rem',
                      width: '100%',
                    }}
                  />
                  <textarea
                    value={mainNews.text}
                    onChange={e => handleNewsChange(newsData.indexOf(mainNews), { ...mainNews, text: e.target.value })}
                    placeholder="Description"
                    rows={5}
                    className="admin-news-desc"
                    style={{
                      fontSize: '1.1rem',
                      width: '100%',
                      border: '1px solid #ccc',
                      borderRadius: 6,
                      padding: '0.5rem',
                      resize: 'vertical',
                    }}
                  />
                </div>
              </div>
            )
          )}
          {/* Always show only 4 small news cards in side1, side2, side3, side4 order */}
          <div className="news-cards-container">
            {smallNews.map((item, idx) => (
              <div
                className="news-card"
                style={{
                  position: 'relative',
                  border: selectedNewsIdx === idx + 1 ? '2px solid #646cff' : undefined,
                  cursor: 'pointer'
                }}
                key={item._id || idx}
                onClick={() => handleCardSelect(newsData.indexOf(item))}
              >
                <div
                  className="news-card-img"
                  style={{
                    backgroundImage: item.img ? `url(${getImageSrc(item.img)})` : undefined,
                  }}
                >
                  <button
                    type="button"
                    className="admin-news-delete-btn"
                    style={{ position: 'absolute', top: 16, right: 16 }}
                    onClick={e => { e.stopPropagation(); handleDelete(newsData.indexOf(item)); }}
                  >
                    &#10006;
                  </button>
                </div>
                <div className="news-card-content">
                  <input
                    type="text"
                    value={item.title}
                    onChange={e => handleNewsChange(newsData.indexOf(item), { ...item, title: e.target.value })}
                    placeholder="Title"
                    className="admin-news-title"
                    style={{
                      fontSize: '1.4rem',
                      fontWeight: 600,
                      marginBottom: '1rem',
                      border: '1px solid #ccc',
                      borderRadius: 6,
                      padding: '0.5rem',
                      width: '100%',
                    }}
                  />
                  <textarea
                    value={item.text}
                    onChange={e => handleNewsChange(newsData.indexOf(item), { ...item, text: e.target.value })}
                    placeholder="Description"
                    rows={3}
                    className="admin-news-desc"
                    style={{
                      fontSize: '1rem',
                      width: '100%',
                      border: '1px solid #ccc',
                      borderRadius: 6,
                      padding: '0.5rem',
                      resize: 'vertical',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Fixed upload button for all cards at the bottom center */}
        {!showAddMainNews && (
          <button
            type="button"
            className="admin-news-upload-btn global"
            style={{
              position: 'fixed',
              left: '50%',
              bottom: 32,
              transform: 'translateX(-50%)',
              zIndex: 1001,
            }}
            onClick={handleUploadClick}
          >
            Upload Image to Selected Card
          </button>
        )}
      </section>
      <section style={{ marginTop: 60 }}>
        <EditableSquadSection />
      </section>
    </div>
  );
}

export default AdminDashboard;
