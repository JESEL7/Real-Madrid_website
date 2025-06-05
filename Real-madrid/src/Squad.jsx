import React, { useEffect, useRef, useState } from 'react';
import './Squad.css';

function getImageSrc(img) {
  if (!img) return '';
  if (img.startsWith('data:image')) return img;
  if (img.length > 100) return `data:image/jpeg;base64,${img}`; // crude base64 check
  if (img.startsWith('http')) return img;
  return `/assets/${img}`;
}

function SquadRow({ title, players }) {
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 4;
  const total = players.length;

  const handlePrev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));
  const handleNext = () => setCurrentIndex((prev) => Math.min(prev + 1, total - visibleCount));

  useEffect(() => {
    const { current } = scrollRef;
    if (!current) return;
    const cardWidth = current.querySelector('.squad-card')?.offsetWidth || 230;
    const gap = 16;
    current.scrollTo({
      left: (cardWidth + gap) * currentIndex,
      behavior: 'smooth'
    });
  }, [currentIndex]);

  const hideArrows = title === "Goalkeeper" || title === "Coach";

  return (
    <section id="squad">
      <div className="squad-section">
        <h2 className="squad-title">{title}</h2>
        <div className="squad-wrapper">
          {!hideArrows && (
            <button
              className="squad-arrow left"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              aria-label="Previous"
            >
              &lt;
            </button>
          )}
          <div className="squad-scroll" ref={scrollRef}>
            {players.map((player, idx) => {
              let goalsConceded = player.goalsConceded ?? player.goalsconceded ?? player.goals_conceded ?? player['Goals Conceded'] ?? '-';
              let wins = player.wins ?? player.Wins ?? '-';
              let draws = player.draws ?? player.Draws ?? '-';
              let loses = player.loses ?? player.losses ?? player.Loses ?? player.Losses ?? '-';
              return (
                <div className="squad-card" key={player.name + idx}>
                  <img src={getImageSrc(player.image)} alt={player.name} className="squad-image" />
                  <div className="squad-info">
                    {player.number && <span className="squad-number">{player.number}</span>}
                    <span className="squad-name">{player.name}</span>
                    <span className="squad-position">{player.position}</span>
                  </div>
                  <div className="squad-stats-overlay">
                    <div className="stat-row"><span>Matches</span><span>{player.matches ?? '-'}</span></div>
                    {title === "Goalkeeper" ? (
                      <>
                        <div className="stat-row"><span>Saves</span><span>{player.saves ?? '-'}</span></div>
                        <div className="stat-row"><span>Minutes</span><span>{player.minutes ?? '-'}</span></div>
                        <div className="stat-row"><span>Goals Conceded</span><span>{goalsConceded}</span></div>
                      </>
                    ) : title === "Coach" ? (
                      <>
                        <div className="stat-row"><span>Wins</span><span>{wins}</span></div>
                        <div className="stat-row"><span>Draws</span><span>{draws}</span></div>
                        <div className="stat-row"><span>Loses</span><span>{loses}</span></div>
                      </>
                    ) : (
                      <>
                        <div className="stat-row"><span>Goals</span><span>{player.goals ?? '-'}</span></div>
                        <div className="stat-row"><span>Minutes</span><span>{player.minutes ?? '-'}</span></div>
                        <div className="stat-row"><span>Assists</span><span>{player.assists ?? '-'}</span></div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {!hideArrows && (
            <button
              className="squad-arrow right"
              onClick={handleNext}
              disabled={currentIndex >= total - visibleCount}
              aria-label="Next"
            >
              &gt;
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

function Squad() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/squad')
      .then(res => res.json())
      .then(data => {
        setPlayers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Group players by normalized position (case-insensitive, singular)
  const groupBy = (arr, key) =>
    arr.reduce((acc, item) => {
      // Normalize position: lowercase, remove trailing 's'
      let pos = (item[key] || '').toLowerCase().replace(/s$/, '');
      acc[pos] = acc[pos] || [];
      acc[pos].push(item);
      return acc;
    }, {});

  const grouped = groupBy(players, 'position');

  return (
    <div>
      <h1 className="squad-main-heading">Squad</h1>
      {loading ? (
        <div>Loading squad...</div>
      ) : (
        <>
          {grouped['goalkeeper'] && <SquadRow title="Goalkeeper" players={grouped['goalkeeper']} />}
          {grouped['defender'] && <SquadRow title="Defender" players={grouped['defender']} />}
          {grouped['midfielder'] && <SquadRow title="Midfielder" players={grouped['midfielder']} />}
          {grouped['forward'] && <SquadRow title="Forward" players={grouped['forward']} />}
          {grouped['coach'] && <SquadRow title="Coach" players={grouped['coach']} />}
        </>
      )}
    </div>
  );
}

export default Squad;
