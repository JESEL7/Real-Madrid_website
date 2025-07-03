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
  // If already base64 but missing prefix, add it
  return `data:image/jpeg;base64,${img}`;
}

function EditableSquadCard({ player, onChange, onDelete, isSelected, onSelect }) {
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
      <img
        src={getImageSrc(player.image)}
        alt={player.name}
        className="squad-image"
        style={{ cursor: 'pointer' }}
      />
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

function EditableSquadSection({ selectedSquadIdx, setSelectedSquadIdx }) {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch('/api/squad')
      .then(res => res.json())
      .then(data => setPlayers(Array.isArray(data) ? data : []));
    window.setSquadImage = (idx, img) => {
      if (players[idx] && players[idx]._id) {
        fetch(`/api/squad/${players[idx]._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...players[idx], image: img })
        })
          .then(res => {
            if (!res.ok) throw new Error();
            setPlayers(players => {
              const arr = [...players];
              arr[idx] = { ...arr[idx], image: img };
              return arr;
            });
          });
      }
    };
    return () => { window.setSquadImage = undefined; };
    // eslint-disable-next-line
  }, [players]);

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

  // Helper for horizontal scroll
  const scrollRefs = {
    defender: useRef(null),
    midfielder: useRef(null),
    forward: useRef(null)
  };

  const handleScroll = (pos, dir) => {
    const ref = scrollRefs[pos];
    if (ref && ref.current) {
      const scrollAmount = 340; // width of card + gap
      ref.current.scrollBy({ left: dir * scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div>
      <h1 className="squad-main-heading">Squad (Editable)</h1>
      {['goalkeeper', 'defender', 'midfielder', 'forward', 'coach'].map(pos =>
        grouped[pos] ? (
          <div className="squad-section" key={pos} style={{ position: 'relative' }}>
            <h2 className="squad-title">{pos.charAt(0).toUpperCase() + pos.slice(1)}</h2>
            <div className="squad-wrapper" style={{ position: 'relative' }}>
              {/* Show arrows only for defender, midfielder, forward */}
              {['defender', 'midfielder', 'forward'].includes(pos) && (
                <>
                  <button
                    className="shop-arrow left"
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: '-6%',
                      transform: 'translateY(-50%)',
                      zIndex: 2
                    }}
                    onClick={() => handleScroll(pos, -1)}
                    aria-label="Scroll Left"
                  >
                    &#8592;
                  </button>
                  <button
                    className="shop-arrow right"
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: '-6%',
                      transform: 'translateY(-50%)',
                      zIndex: 2
                    }}
                    onClick={() => handleScroll(pos, 1)}
                    aria-label="Scroll Right"
                  >
                    &#8594;
                  </button>
                </>
              )}
              <div
                className="squad-scroll"
                ref={['defender', 'midfielder', 'forward'].includes(pos) ? scrollRefs[pos] : undefined}
                style={{
                  overflowX: ['defender', 'midfielder', 'forward'].includes(pos) ? 'auto' : undefined,
                  scrollBehavior: 'smooth',
                  display: 'flex',
                  gap: 24
                }}
              >
                {grouped[pos].map((player, idx) => (
                  <EditableSquadCard
                    key={player._id}
                    player={player}
                    onChange={updated => handlePlayerChange(players.indexOf(player), updated)}
                    onDelete={() => handleDelete(players.indexOf(player))}
                    isSelected={selectedSquadIdx === players.indexOf(player)}
                    onSelect={() => setSelectedSquadIdx(players.indexOf(player))}
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

function EditableFixtureCard({ fixture, onChange, onDelete, isSelected, onSelect, onSubmit }) {
  const homeUploadRef = useRef(null);
  const awayUploadRef = useRef(null);

  // Delete logo from DB and UI
  const handleDeleteLogo = (team, e) => {
    e.stopPropagation();
    if (!fixture._id) return;
    fetch(`/api/fixtures/${fixture._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [`${team}Logo`]: "" })
    }).then(() => {
      onChange({ ...fixture, [`${team}Logo`]: "" });
      window.dispatchEvent(new Event('fixtures-updated'));
    });
  };

  // Upload logo and save to DB (add or update)
  const handleFileChange = (team, e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new window.FileReader();
    reader.onload = function(ev) {
      const logoData = ev.target.result;
      // Only allow sending to backend if base64 string is not too large (avoid 413 error)
      if (fixture._id && typeof logoData === "string" && logoData.length < 200000) {
        fetch(`/api/fixtures/${fixture._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ [`${team}Logo`]: logoData })
        }).then(() => {
          onChange({ ...fixture, [`${team}Logo`]: logoData });
          window.dispatchEvent(new Event('fixtures-updated'));
        });
      } else {
        // If too large, only update UI and show warning
        if (logoData.length >= 200000) {
          alert("Image too large. Please upload a smaller image (less than 200KB).");
        }
        onChange({ ...fixture, [`${team}Logo`]: logoData });
      }
    };
    reader.readAsDataURL(file);
  };

  // Only select card if the click is not on an input, textarea, or button
  const handleCardClick = (e) => {
    // Prevent card selection if the click is on an input, textarea, or button
    if (
      e.target.tagName === 'INPUT' ||
      e.target.tagName === 'TEXTAREA' ||
      e.target.tagName === 'BUTTON'
    ) {
      return;
    }
    onSelect();
  };

  return (
    <div
      className="fixture-card"
      style={{
        border: isSelected ? '2px solid #646cff' : undefined,
        cursor: 'pointer',
        position: 'relative'
      }}
      onClick={handleCardClick}
    >
      <input
        ref={homeUploadRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={e => handleFileChange('home', e)}
      />
      <input
        ref={awayUploadRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={e => handleFileChange('away', e)}
      />
      <div className="fixture-top">
        <div className="team">
          <div style={{ position: "relative", width: "56px", height: "56px" }}>
            {fixture.homeLogo ? (
              <>
                <img src={getImageSrc(fixture.homeLogo)} alt={fixture.homeTeam} style={{ width: "56px", height: "56px", borderRadius: "50%", objectFit: "contain" }} />
                <button
                  type="button"
                  className="admin-news-delete-btn"
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-8px",
                    width: 24,
                    height: 24,
                    fontSize: 14,
                    zIndex: 5,
                    background: "#ff4d4f",
                    color: "#fff",
                    border: "none",
                    borderRadius: "50%",
                    cursor: "pointer",
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                  title="Delete Home Logo"
                  onClick={e => handleDeleteLogo('home', e)}
                >
                  ×
                </button>
              </>
            ) : (
              <button
                type="button"
                className="admin-news-upload-btn"
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: "#f5f5f5",
                  color: "#646cff",
                  fontSize: 24,
                  border: "1px solid #e0e0e0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0,
                  marginBottom: 4,
                  marginTop: 4,
                  position: "relative"
                }}
                title="Add Home Logo"
                onClick={e => {
                  e.stopPropagation();
                  homeUploadRef.current.value = '';
                  homeUploadRef.current.click();
                }}
              >
                +
              </button>
            )}
          </div>
          <input
            type="text"
            value={fixture.homeTeam || ''}
            onChange={e => onChange({ ...fixture, homeTeam: e.target.value })}
            placeholder="Home Team"
            style={{ width: '90px', marginTop: 8, textAlign: 'center' }}
          />
          
        </div>
        <div className="team">
          <div style={{ position: "relative", width: "56px", height: "56px" }}>
            {fixture.awayLogo ? (
              <>
                <img src={getImageSrc(fixture.awayLogo)} alt={fixture.awayTeam} style={{ width: "56px", height: "56px", borderRadius: "50%", objectFit: "contain" }} />
                <button
                  type="button"
                  className="admin-news-delete-btn"
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-8px",
                    width: 24,
                    height: 24,
                    fontSize: 14,
                    zIndex: 5,
                    background: "#ff4d4f",
                    color: "#fff",
                    border: "none",
                    borderRadius: "50%",
                    cursor: "pointer",
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                  title="Delete Away Logo"
                  onClick={e => handleDeleteLogo('away', e)}
                >
                  ×
                </button>
              </>
            ) : (
              <button
                type="button"
                className="admin-news-upload-btn"
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: "#f5f5f5",
                  color: "#646cff",
                  fontSize: 24,
                  border: "1px solid #e0e0e0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0,
                  marginBottom: 4,
                  marginTop: 4,
                  position: "relative"
                }}
                title="Add Away Logo"
                onClick={e => {
                  e.stopPropagation();
                  awayUploadRef.current.value = '';
                  awayUploadRef.current.click();
                }}
              >
                +
              </button>
            )}
          </div>
          <input
            type="text"
            value={fixture.awayTeam || ''}
            onChange={e => onChange({ ...fixture, awayTeam: e.target.value })}
            placeholder="Away Team"
            style={{ width: '90px', marginTop: 8, textAlign: 'center' }}
          />
        </div>
      </div>
      <div className="fixture-bottom">
        <input
          type="text"
          value={fixture.category || ''}
          onChange={e => onChange({ ...fixture, category: e.target.value })}
          placeholder="Category"
          className="category"
          style={{ width: '100%', marginBottom: 8 }}
        />
        <input
          type="text"
          value={fixture.tournament || ''}
          onChange={e => onChange({ ...fixture, tournament: e.target.value })}
          placeholder="Tournament"
          style={{ width: '100%', fontWeight: 700, marginBottom: 8 }}
        />
        <input
          type="text"
          value={fixture.matchday || ''}
          onChange={e => onChange({ ...fixture, matchday: e.target.value })}
          placeholder="Matchday"
          style={{ width: '100%', marginBottom: 8 }}
        />
        <input
          type="text"
          value={fixture.date || ''}
          onChange={e => onChange({ ...fixture, date: e.target.value })}
          placeholder="Date"
          style={{ width: '100%', marginBottom: 8 }}
        />
        <input
          type="text"
          value={fixture.location || ''}
          onChange={e => onChange({ ...fixture, location: e.target.value })}
          placeholder="Location"
          style={{ width: '100%' }}
        />
        <button
          type="button"
          className="admin-news-delete-btn"
          style={{ position: 'absolute', top: 16, right: 16 }}
          onClick={e => { e.stopPropagation(); onDelete(); }}
        >
          &#10006;
        </button>
        <div className="fixture-submit-row">
          <button
            type="button"
            className="admin-news-upload-btn fixture-submit-btn"
            onClick={e => { e.stopPropagation(); onSubmit(); }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

function EditableFixturesSection() {
  const [fixtures, setFixtures] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [pending, setPending] = useState({}); // Track local edits before submit

  // Fetch fixtures from DB and update state
  const fetchFixtures = () => {
    fetch('/api/fixtures')
      .then(res => res.json())
      .then(data => {
        setFixtures(Array.isArray(data) ? data : []);
        setPending({});
      });
  };

  useEffect(() => {
    fetchFixtures();
    // Listen for fixture updates (logo add/delete/submit)
    const handler = () => fetchFixtures();
    window.addEventListener('fixtures-updated', handler);
    return () => window.removeEventListener('fixtures-updated', handler);
  }, []);

  // Local edit handler: only update local pending state
  const handleFixtureChange = (idx, updated) => {
    setPending(pending => ({
      ...pending,
      [idx]: { ...fixtures[idx], ...pending[idx], ...updated }
    }));
    setFixtures(fixtures => {
      const arr = [...fixtures];
      arr[idx] = { ...arr[idx], ...updated };
      return arr;
    });
  };

  // Submit handler: send only changed fields (not images) to backend to avoid 413 error
  const handleSubmit = (idx) => {
    const fixture = fixtures[idx];
    const updated = pending[idx];
    if (!fixture || !fixture._id || !updated) return;

    // Only send text fields, not images (homeLogo, awayLogo) unless they are changed and are not large base64 strings
    // If you want to allow image update, only send if it's a short string (URL), not a large base64
    const payload = {};
    for (const key in updated) {
      if (
        key === 'homeLogo' || key === 'awayLogo'
      ) {
        // Only send if it's a short string (likely a URL), not a large base64 string
        if (typeof updated[key] === 'string' && updated[key].length < 500) {
          payload[key] = updated[key];
        }
        // Otherwise, skip sending large base64 images to avoid 413
      } else {
        payload[key] = updated[key];
      }
    }

    fetch(`/api/fixtures/${fixture._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => {
        if (!res.ok) throw new Error();
        setPending(pending => {
          const copy = { ...pending };
          delete copy[idx];
          return copy;
        });
        window.dispatchEvent(new Event('fixtures-updated'));
      })
      .catch(() => {});
  };

  const handleDeleteFixture = (idx) => {
    const fixture = fixtures[idx];
    if (!fixture || !fixture._id) return;
    fetch(`/api/fixtures/${fixture._id}`, { method: 'DELETE' })
      .then(res => {
        if (!res.ok) throw new Error();
        setFixtures(fixtures => {
          const arr = [...fixtures];
          arr.splice(idx, 1);
          return arr;
        });
        setPending(pending => {
          const copy = { ...pending };
          delete copy[idx];
          return copy;
        });
        window.dispatchEvent(new Event('fixtures-updated'));
      })
      .catch(() => {});
  };

  return (
    <div>
      <h2 style={{ marginTop: 60, color: "black", fontSize: "2rem", marginBottom: 24 }}>Fixtures (Editable)</h2>
      <div className="fixtures-section admin-dashboard">
        {fixtures.map((fixture, idx) => (
          <EditableFixtureCard
            key={fixture._id || idx}
            fixture={pending[idx] ? pending[idx] : fixture}
            onChange={updated => handleFixtureChange(idx, updated)}
            onDelete={() => handleDeleteFixture(idx)}
            isSelected={selectedIdx === idx}
            onSelect={() => setSelectedIdx(idx)}
            onSubmit={() => handleSubmit(idx)}
          />
        ))}
      </div>
    </div>
  );
}

function EditableAchievementsSection() {
  const [achievements, setAchievements] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/achievements')
      .then(res => res.json())
      .then(data => {
        setAchievements(data || {});
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleTrophyChange = (key, value) => {
    const updated = { ...achievements, [key]: value };
    setAchievements(updated);
    // Save to backend
    fetch('/api/achievements', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    });
    // Optionally, broadcast update
    window.dispatchEvent(new Event('achievements-updated'));
  };

  // Exclude _id from editing
  const trophyList = Object.entries(achievements).filter(([k]) => k !== '_id');

  return (
    <div style={{ marginTop: 60 }}>
      <h2 style={{ color: 'black' }}>Achievements (Editable)</h2>
      {loading ? (
        <div>Loading achievements...</div>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, color: 'black' }}>
          {trophyList.map(([label, count]) => (
            <div key={label} style={{
              minWidth: 220,
              background: '#fff',
              borderRadius: 12,
              boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
              padding: 18,
              marginBottom: 18,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <div style={{ fontWeight: 600, marginBottom: 8 }}>{label}</div>
              <input
                type="number"
                value={count}
                min={0}
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  width: 80,
                  textAlign: 'center',
                  border: '1px solid #ccc',
                  borderRadius: 6,
                  padding: '0.3rem 0.5rem'
                }}
                onChange={e => handleTrophyChange(label, Number(e.target.value))}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AdminDashboard() {
  // Make newsData local state editable, and only save to backend on Save button
  const [newsData, setNewsData] = useState([]);
  const [newsChanged, setNewsChanged] = useState(false);
  const uploadInputRef = useRef(null);
  const [selectedNewsIdx, setSelectedNewsIdx] = useState(0);
  const [selectedSquadIdx, setSelectedSquadIdx] = useState(null); // NEW: for squad selection
  const [showAddMainNews, setShowAddMainNews] = useState(false);
  const [newMainNews, setNewMainNews] = useState({ title: '', text: '', img: '' });

  // Fetch all news from DB
  useEffect(() => {
    fetch('/api/news')
      .then(res => res.json())
      .then(data => {
        setNewsData(Array.isArray(data) ? data : []);
        if (!data || !data.some(n => n.role === 'main')) setShowAddMainNews(true);
        else setShowAddMainNews(false);
      });
  }, []);

  // Local edit handler for news: save immediately to backend and update UI
  const handleNewsChange = (idx, updated) => {
    const news = newsData[idx];
    if (!news || !news._id) return;
    // Update local state for instant UI feedback
    setNewsData(newsData => {
      const arr = [...newsData];
      arr[idx] = { ...arr[idx], ...updated };
      return arr;
    });
    // Save to backend immediately
    fetch(`/api/news/${news._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: updated.title !== undefined ? updated.title : news.title,
        text: updated.text !== undefined ? updated.text : news.text,
        img: updated.img !== undefined ? updated.img : news.img,
        role: news.role
      })
    }).then(() => {
      window.dispatchEvent(new Event('news-updated'));
    });
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
          if (idx === 0) setShowAddMainNews(true);
          return arr;
        });
      })
      .catch(() => {});
  };

  // Card click handler to select which card to upload image for
  const handleCardSelect = (idx) => {
    setSelectedNewsIdx(idx);
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
    // If a squad card is selected, upload to squad
    if (selectedSquadIdx !== null) {
      // Find squad section and update image
      // We'll need to pass a callback to EditableSquadSection to update the image
      if (typeof window.setSquadImage === 'function') {
        const reader = new FileReader();
        reader.onload = (ev) => {
          window.setSquadImage(selectedSquadIdx, ev.target.result);
          e.target.value = '';
        };
        reader.readAsDataURL(file);
      }
      return;
    }
    // Otherwise, upload to news
    const idx = selectedNewsIdx;
    const news = newsData[idx];
    if (!news) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      handleNewsChange(idx, {
        ...news,
        img: ev.target.result,
        role: news.role
      });
      e.target.value = '';
    };
    reader.readAsDataURL(file);
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
  const others = newsData.filter(
    n => !['main', 'side1', 'side2', 'side3', 'side4'].includes(n.role)
  );
  const smallNews = [side1, side2, side3, side4]
    .map((item, idx) => item || others[idx])
    .filter(Boolean);

  useEffect(() => {
    const handleNewsUpdated = () => {
      fetch('/api/news')
        .then(res => res.json())
        .then(data => setNewsData(Array.isArray(data) ? data : []));
    };
    window.addEventListener('news-updated', handleNewsUpdated);
    return () => window.removeEventListener('news-updated', handleNewsUpdated);
  }, []);

  // Delete only the image from a news card
  const handleDeleteImage = (idx) => {
    const news = newsData[idx];
    if (!news || !news._id) return;
    handleNewsChange(idx, { ...news, img: '' });
  };

  return (
    <div className="admin-dashboard" style={{ position: 'relative', minHeight: '100vh' }}>
      <AdminNavbar />
      {/* Add Admin-DashBoard heading here */}
      <h1 style={{ textAlign: "center", marginTop: 32, marginBottom: 32, color: "black", fontWeight: 700, fontSize: "3.2rem" }}>
        Admin-DashBoard
      </h1>
      <section style={{ marginTop: 100 }}>
        <h2 style={{ color: "black" }}>News Section (Editable)</h2>
        {/* Save button for News */}
        {newsChanged && (
          <button
            className="admin-news-upload-btn"
            style={{ marginBottom: 16, background: "#3a1ff4", color: "#fff" }}
            onClick={handleSaveNews}
          >
            Save News
          </button>
        )}
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
                style={{
                  position: 'relative',
                  border: selectedNewsIdx === newsData.indexOf(mainNews) ? '2px solid #646cff' : undefined,
                  cursor: 'pointer'
                }}
                onClick={() => handleCardSelect(newsData.indexOf(mainNews))}
              >
                <div
                  className="main-card-news-img"
                  style={{
                    backgroundImage: mainNews.img ? `url(${getImageSrc(mainNews.img)})` : undefined,
                    position: 'relative'
                  }}
                >
                  {/* Delete image button for main news (on image area) */}
                  {mainNews.img && (
                    <button
                      type="button"
                      className="admin-news-delete-btn"
                      style={{ position: 'absolute', top: 16, left: 16, zIndex: 3 }}
                      title="Delete Image"
                      onClick={e => { e.stopPropagation(); handleDeleteImage(newsData.indexOf(mainNews)); }}
                    >
                      🗑️
                    </button>
                  )}
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
                  border: selectedNewsIdx === newsData.indexOf(item) ? '2px solid #646cff' : undefined,
                  cursor: 'pointer'
                }}
                key={item._id || idx}
                onClick={() => handleCardSelect(newsData.indexOf(item))}
              >
                <div
                  className="news-card-img"
                  style={{
                    backgroundImage: item.img ? `url(${getImageSrc(item.img)})` : undefined,
                    position: 'relative'
                  }}
                >
                  {/* Delete image button for small news cards (on image area) */}
                  {item.img && (
                    <button
                      type="button"
                      className="admin-news-delete-btn"
                      style={{ position: 'absolute', top: 16, left: 16, zIndex: 3 }}
                      title="Delete Image"
                      onClick={e => { e.stopPropagation(); handleDeleteImage(newsData.indexOf(item)); }}
                    >
                      🗑️
                    </button>
                  )}
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
        <EditableSquadSection
          selectedSquadIdx={selectedSquadIdx}
          setSelectedSquadIdx={setSelectedSquadIdx}
        />
      </section>
      <section style={{ marginTop: 60 }}>
        <EditableFixturesSection />
      </section>
      <section style={{ marginTop: 60 }}>
        <EditableAchievementsSection />
      </section>
    </div>
  );
}

export default AdminDashboard;