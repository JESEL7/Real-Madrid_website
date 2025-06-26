import React from "react";
import "./Emirates.css";

const EmiratesCard = () => (
  <div className="emirates-card">
    <video
      className="emirates-card-video"
      src="https://content.presspage.com/uploads/2431/d7af7b7e-5d30-4359-b18b-6e5458eb0fef/emiratesandrealmadrid.mp4?90367"
      controls
      autoPlay
      loop
      muted
      style={{ width: "100%", height: "100%", borderRadius: "16px", objectFit: "cover" }}
    />
    <a
      href="https://www.emirates.com"
      target="_blank"
      rel="noopener noreferrer"
      className="emirates-learn-btn small-top-right"
    >
      Learn More
    </a>
  </div>
);

export default EmiratesCard;
