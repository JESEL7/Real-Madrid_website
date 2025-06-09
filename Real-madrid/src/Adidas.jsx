import React from "react";
import "./Adidas.css";
import adidasImg from "./assets/adidas.png"; // adjust path if needed

const AdidasCard = () => (
  <div className="adidas-card">
    <img src={adidasImg} alt="Adidas" className="adidas-card-bg" />
    <a
      href="https://www.adidas.co.in/football_boots_pack?gad_source=7"
      target="_blank"
      rel="noopener noreferrer"
      className="adidas-shop-btn-right"
    >
      Shop Now
    </a>
  </div>
);

export default AdidasCard;
