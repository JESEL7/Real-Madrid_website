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

  const mainNews = newsData.length > 0 ? newsData[0] : null;
  const otherNews = newsData.length > 1 ? newsData.slice(1) : [];

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
            otherNews.map((item, idx) => (
              <div className="news-card" key={idx}>
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
