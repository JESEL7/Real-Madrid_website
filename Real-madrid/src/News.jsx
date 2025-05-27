import React from 'react'
import './News.css'
import newsImg1 from './assets/news1.jpg'
import newsImg2 from './assets/news2.jpg'
import newsImg3 from './assets/news3.jpg'
import newsImg4 from './assets/news4.jpg'
import newsImg from './assets/news.jpg'

const newsData = [
  {
    img: newsImg1,
    title: "Xabi Alonso unveiled as new Real Madrid coach",
    text: "Xabi Alonso has been appointed as the new head coach of Real Madrid, succeeding Carlo Ancelotti. The former midfielder returns to the club where he enjoyed great success as a player."
  },
  {
    img: newsImg2,
    title: "Mbappé: Golden Boot 2024-25",
    text: "With 31 goals in LaLiga and 62 points in the standings, the Frenchman has become European football’s top scorer for the first time. He is the first Real Madrid player to win the Golden Boot since Cristiano Ronaldo in 2014-15."
  },
  {
    img: newsImg3,
    title: "Madridismo emotion with moving video tribute",
    text: "The Santiago Bernabéu enjoyed an emotional evening as Carlo Ancelotti and Luka Modrić said goodbye to the club."
  },
  {
    img: newsImg4,
    title: "Huijsen, new Real Madrid player",
    text: "The 20-year-old centre-back has already made his debut for the Spanish national team. He joins from Bournemouth and is nominated for the Premier League Young Player of the Season 2024-2025."
  }
]

function News() {
  return (
    <div>
      <div className="main-card-news">
        <div className="main-card-news-img" style={{ backgroundImage: `url(${newsImg})` }}></div>
        <div className="main-card-news-content">
        <h2>Xabi Alonso unveiled as new Real Madrid coach</h2>
          <p>
            “It's the dawn of a new era, full of excitement and intense emotions. The coach coming in is already one of the best in the world and the embodiment of the Real Madrid values,” stated Florentino Pérez.
        </p>
        </div>
      </div>
      <div className="news-cards-container">
        {newsData.map((item, idx) => (
          <div className="news-card" key={idx}>
            <div className="news-card-img" style={{ backgroundImage: `url(${item.img})` }}></div>
            <div className="news-card-content">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default News
