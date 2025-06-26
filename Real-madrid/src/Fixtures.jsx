import React, { useEffect, useState } from 'react';
import './Fixtures.css';

function getLogoSrc(logo) {
  if (!logo) return '';
  if (logo.startsWith('data:image')) return logo;
  // If it's a long string, assume it's base64-encoded image data (jpeg)
  if (logo.length > 100) return `data:image/jpeg;base64,${logo}`;
  if (logo.startsWith('http')) return logo;
  return `/assets/${logo}`;
}

const Fixtures = () => {
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/fixtures')
      .then(res => res.json())
      .then(data => {
        setFixtures(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="fixtures">
      <div className="fixtures-section">
        {loading ? (
          <div>Loading fixtures...</div>
        ) : (
          fixtures.map((fixture) => (
            <div className="fixture-card" key={fixture._id || fixture.id}>
              <div className="fixture-top">
                <div className="team">
                  <img src={getLogoSrc(fixture.homeLogo)} alt={fixture.homeTeam} />
                  <p>{fixture.homeTeam}</p>
                </div>
                <div className="team">
                  <img src={getLogoSrc(fixture.awayLogo)} alt={fixture.awayTeam} />
                  <p>{fixture.awayTeam}</p>
                </div>
              </div>
              <div className="fixture-bottom">
                <p className="category">{fixture.category || 'Football · First Team · Male'}</p>
                <h3>{fixture.tournament}</h3>
                <p className="matchday">{fixture.matchday}</p>
                <p className="date">📅 {fixture.date} h</p>
                <p className="location">📍 {fixture.location}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Fixtures;
