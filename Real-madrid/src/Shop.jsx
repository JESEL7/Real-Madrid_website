import React, { useRef, useState, useEffect } from "react";
import "./Shop.css";
import bringBack from "./assets/bring-back.png";
import terraceIcons from "./assets/terrace-icons.png";
import varsity from "./assets/varsity.png";
import chineseNewYear from "./assets/chinese-new-year.png";
import homeKit from "./assets/home-kit.png";
import training from "./assets/training.png";
import colorCrest from "./assets/color-crest.png";

const shopItems = [
  { title: "Bring Back", image: bringBack, link: "https://shop.realmadrid.com/en-us/content/jerseys-kits/ltd-edition?utm_source=web&utm_medium=shop-links&utm_campaign=herocarrusel_colecciones-ecom_perm_en_us&utm_content=teka-landing&campaignId=cac0da59-74cd-43fc-8fea-0e7aa9281fe9&campaignChannel=web-her&language=en-US" },
  { title: "Terrace Icons", image: terraceIcons, link: "https://shop.realmadrid.com/en-us/adidas/originals?utm_source=web&utm_medium=shop-links&utm_campaign=herobanner_colecciones-ecom_perm_en_us&utm_content=adidas-originals&campaignId=56dc2c1c-5b65-4688-b3ee-18944f62f05b&campaignChannel=web-herocarrusel&language=en-US" },
  { title: "Varsity", image: varsity, link: "https://shop.realmadrid.com/en-us/fashion/travel?utm_source=web&utm_medium=shop-links&utm_campaign=herobanner_colecciones-ecom_perm_en_us&utm_content=fashion-travel&campaignId=56dc2c1c-5b65-4688-b3ee-18944f62f05b&campaignChannel=web-herocarrusel&language=en-US" },
  { title: "Chinese New Year", image: chineseNewYear, link: "https://shop.realmadrid.com/en-us/fashion/purple?utm_source=web&utm_medium=shop-links&utm_campaign=herobanner_colecciones-ecom_perm_en_us&utm_content=fashion-purple&campaignId=56dc2c1c-5b65-4688-b3ee-18944f62f05b&campaignChannel=web-herocarrusel&language=en-US" },
  { title: "Home Kit 24/25", image: homeKit, link: "https://shop.realmadrid.com/en-us/jerseys-kits/24-25?utm_source=web&utm_medium=shop-links&utm_campaign=herobanner_colecciones-ecom_perm_en_us&utm_content=jerseys-kits&campaignId=56dc2c1c-5b65-4688-b3ee-18944f62f05b&campaignChannel=web-herocarrusel&language=en-US" },
  { title: "Official training collection", image: training, link: "https://shop.realmadrid.com/en-us/adidas/training?utm_source=web&utm_medium=shop-links&utm_campaign=herobanner_colecciones-ecom_perm_en_us&utm_content=adidas-training&campaignId=56dc2c1c-5b65-4688-b3ee-18944f62f05b&campaignChannel=web-herocarrusel&language=en-US" },
  { title: "Color Crest", image: colorCrest, link: "https://shop.realmadrid.com/en-us/fanworld/colored-crest?utm_source=web&utm_medium=shop-links&utm_campaign=herobanner_colecciones-ecom_perm_en_us&utm_content=colored-crest&campaignId=56dc2c1c-5b65-4688-b3ee-18944f62f05b&campaignChannel=web-herocarrusel&language=en-US" },
];

const visibleCount = 3;

const Shop = () => {
  const rowRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const [maxIndex, setMaxIndex] = useState(shopItems.length - visibleCount);

  useEffect(() => {
    // Recalculate maxIndex on resize for responsiveness
    const handleResize = () => {
      if (!rowRef.current) return;
      const containerWidth = rowRef.current.offsetWidth;
      const card = rowRef.current.querySelector('.shop-card');
      const cardWidth = card ? card.offsetWidth : 380;
      const gap = parseInt(getComputedStyle(rowRef.current).gap) || 32;
      const cardsPerView = Math.floor((containerWidth + gap) / (cardWidth + gap));
      setMaxIndex(Math.max(shopItems.length - cardsPerView, 0));
      // If current index is out of new bounds, reset
      setCurrent((prev) => Math.min(prev, Math.max(shopItems.length - cardsPerView, 0)));
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleScroll = (dir) => {
    let newIndex = current + dir;
    if (newIndex < 0) newIndex = 0;
    if (newIndex > maxIndex) newIndex = maxIndex;
    setCurrent(newIndex);
    const cardWidth = rowRef.current.querySelector('.shop-card')?.offsetWidth || 380;
    const gap = parseInt(getComputedStyle(rowRef.current).gap) || 32;
    rowRef.current.scrollTo({
      left: (cardWidth + gap) * newIndex,
      behavior: 'smooth'
    });
  };

  return (
    <section id="shop">
      <div className="shop-section" style={{ position: "relative" }}>
        <h2 className="shop-title">Official Store</h2>
        <h3 className="shop-subtitle">Featured Collections</h3>
        <button
          className="shop-arrow left"
          onClick={() => handleScroll(-1)}
          disabled={current === 0}
          aria-label="Previous"
        >
          &#8592;
        </button>
        <div className="shop-carousel" ref={rowRef}>
          {shopItems.map((item, index) => (
            <div className="shop-card" key={index}>
              <img src={item.image} alt={item.title} className="shop-image" />
              <h4 className="shop-card-title">{item.title}</h4>
              <a
                href={item.link}
                className="shop-button"
                target="_blank"
                rel="noopener noreferrer"
              >
                Shop now
              </a>
            </div>
          ))}
        </div>
        <button
          className="shop-arrow right"
          onClick={() => handleScroll(1)}
          disabled={current >= maxIndex}
          aria-label="Next"
        >
          &#8594;
        </button>
      </div>
    </section>
  );
};

export default Shop;
