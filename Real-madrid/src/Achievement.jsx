import React, { useEffect, useState } from 'react';
import './Achievement.css';
import trophies from './assets/trophies.jpg';

const trophyIcons = {
  "The Best Club of the 20th Century FIFA Trophy": "https://assets.realmadrid.com/is/content/realmadrid/SIGLOXX-1?$Desktop$&wid=40&hei=40",
  "FIFA Club World Cups": "https://assets.realmadrid.com/is/content/realmadrid/cmvff99i4w10udooqckzt8c2x-icon?$Desktop$&wid=40&hei=40",
  "European Super Cups": "https://assets.realmadrid.com/is/content/realmadrid/a0f4gtru0oyxmpvty4thc5qkc_icon?$Desktop$&wid=40&hei=40",
  "UEFA Cups": "https://assets.realmadrid.com/is/content/realmadrid/COPA%20DE%20LA%20UEFA?$Desktop$&wid=40&hei=40",
  "National Leagues": "https://assets.realmadrid.com/is/content/realmadrid/34pl8szyvrbwcmfkuocjm3r6t-icon?$Desktop$&wid=40&hei=40",
  "Spanish Cups": "https://assets.realmadrid.com/is/content/realmadrid/apdwh753fupxheygs8seahh7x-icon?$Desktop$&wid=40&hei=40",
  "European Cups": "https://assets.realmadrid.com/is/content/realmadrid/4oogyu6o156iphvdvphwpck10-icon?$Desktop$&wid=40&hei=40",
  "Spanish Super Cups": "https://assets.realmadrid.com/is/content/realmadrid/sd8z02fe455z2fjvlxvxh0zo-icon?$Desktop$&wid=40&hei=40"
};

const Achievement = () => {
  const [achievements, setAchievements] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/achievements')
      .then(res => res.json())
      .then(data => {
        setAchievements(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Convert achievements object to array for rendering
  const achievementList = achievements
    ? Object.entries(achievements).filter(([key]) => key !== '_id')
    : [];

  // Split into two columns: first 5, then the rest
  const col1 = achievementList.slice(0, 5);
  const col2 = achievementList.slice(5);

  return (
    <section id="achievements">
      <section className="achievement-section">
        <h2 className="title">A legendary track record</h2>
        <div className="achievement-container">
          <div className="achievement-image">
            <img src={trophies} alt="Trophies" />
          </div>
          <div className="achievement-details">
            {loading ? (
              <div>Loading achievements...</div>
            ) : (
              <div className="trophy-grid-custom">
                <div className="trophy-col">
                  {col1.map(([label, count], index) => (
                    <div className="trophy-item" key={index}>
                      <div className="trophy-icon">
                        <img src={trophyIcons[label]} alt="icon" style={{ width: 40, height: 40 }} />
                      </div>
                      <div className="trophy-count">{count}</div>
                      <div className="trophy-label">{label}</div>
                    </div>
                  ))}
                </div>
                <div className="trophy-col">
                  {col2.map(([label, count], index) => (
                    <div className="trophy-item" key={index + 5}>
                      <div className="trophy-icon">
                        <img src={trophyIcons[label]} alt="icon" style={{ width: 40, height: 40 }} />
                      </div>
                      <div className="trophy-count">{count}</div>
                      <div className="trophy-label">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </section>
  );
};

export default Achievement;
