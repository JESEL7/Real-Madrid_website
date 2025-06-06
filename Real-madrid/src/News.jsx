import React, { useEffect, useState } from 'react';
import './News.css';

function News() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/news')
      .then(res => res.json())
      .then(data => {
        setNewsData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const getImageSrc = (img) => {
    if (!img) return '';
    if (img.startsWith('data:image')) return img;
    return `data:image/jpeg;base64,${img}`;
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
    <section id="news">
      <div>
        <div className="main-card-news">
          <div
            className="main-card-news-img"
            style={{
              backgroundImage: `url(${
                mainNews && mainNews.img ? getImageSrc(mainNews.img) : ''
              })`
            }}
          ></div>
          <div className="main-card-news-content">
            <h2>{mainNews ? mainNews.title : ''}</h2>
            <p>
              {mainNews ? mainNews.text : ''}
            </p>
          </div>
        </div>
        <div className="news-cards-container">
          {loading ? (
            <div>Loading news...</div>
          ) : (
            smallNews.map((item, idx) => (
              <div className="news-card" key={item._id || idx}>
                <div
                  className="news-card-img"
                  style={{
                    backgroundImage: `url(${getImageSrc(item.img)})`
                  }}
                ></div>
                <div className="news-card-content">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default News;
