import React from 'react';
import './Achievement.css';
import trophies from './assets/trophies.jpg';

const achievements = [
  { icon: 'https://assets.realmadrid.com/is/content/realmadrid/SIGLOXX-1?$Desktop$&wid=40&hei=40', count: 1, label: 'The Best Club of the 20th Century\nFIFA Trophy' },
  { icon: 'https://assets.realmadrid.com/is/content/realmadrid/cmvff99i4w10udooqckzt8c2x-icon?$Desktop$&wid=40&hei=40', count: 9, label: 'FIFA Club World Cups' },
  { icon: 'https://assets.realmadrid.com/is/content/realmadrid/a0f4gtru0oyxmpvty4thc5qkc_icon?$Desktop$&wid=40&hei=40', count: 6, label: 'European Super Cups' },
  { icon: 'https://assets.realmadrid.com/is/content/realmadrid/COPA%20DE%20LA%20UEFA?$Desktop$&wid=40&hei=40', count: 2, label: 'UEFA Cups' },
  { icon: 'https://assets.realmadrid.com/is/content/realmadrid/34pl8szyvrbwcmfkuocjm3r6t-icon?$Desktop$&wid=40&hei=40', count: 36, label: 'National Leagues' },
  { icon: 'https://assets.realmadrid.com/is/content/realmadrid/apdwh753fupxheygs8seahh7x-icon?$Desktop$&wid=40&hei=40', count: 20, label: 'Spanish Cups' },
  { icon: 'https://assets.realmadrid.com/is/content/realmadrid/4oogyu6o156iphvdvphwpck10-icon?$Desktop$&wid=40&hei=40', count: 15, label: 'European Cups' },
  { icon: 'https://assets.realmadrid.com/is/content/realmadrid/sd8z02fe455z2fjvlxvxh0zo-icon?$Desktop$&wid=40&hei=40', count: 13, label: 'Spanish Super Cups' }
];

const Achievement = () => {
  // Split into two columns: first 5, then 3
  const col1 = achievements.slice(0, 5);
  const col2 = achievements.slice(5);

  return (
    <section className="achievement-section">
      <h2 className="title">A legendary track record</h2>
      <div className="achievement-container">
        <div className="achievement-image">
          <img src={trophies} alt="Trophies" />
        </div>
        <div className="achievement-details">
          <div className="trophy-grid-custom">
            <div className="trophy-col">
              {col1.map((item, index) => (
                <div className="trophy-item" key={index}>
                  <div className="trophy-icon">
                    <img src={item.icon} alt="icon" style={{ width: 40, height: 40 }} />
                  </div>
                  <div className="trophy-count">{item.count}</div>
                  <div
                    className="trophy-label"
                    style={item.label.includes('UEFA Cup') ? { marginLeft: '1.8rem' } : {}}
                  >
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
            <div className="trophy-col">
              {col2.map((item, index) => (
                <div className="trophy-item" key={index + 5}>
                  <div className="trophy-icon">
                    <img src={item.icon} alt="icon" style={{ width: 40, height: 40 }} />
                  </div>
                  <div className="trophy-count">{item.count}</div>
                  <div className="trophy-label">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievement;
