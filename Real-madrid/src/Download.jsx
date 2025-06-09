import React from 'react';
import './Download.css';

const Download = () => {
  return (
    <div className="download-container">
      <p className="download-text">Download Now</p>
      <p className="download-link">Official App Fan</p>
      <div className="store-buttons">
        <a
          href="https://play.google.com/store/apps/details?id=com.mcentric.mcclient.MyMadrid&hl=en&gl=US"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
            alt="Get it on Google Play"
            className="store-image"
          />
        </a>
        <a
          href="https://apps.apple.com/us/app/real-madrid/id1107624540"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
            alt="Download on the App Store"
            className="store-image"
          />
        </a>
        <a
          href="https://appgallery.huawei.com/#/app/C102163903"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://assets.realmadrid.com/is/content/realmadrid/Huawei%20Store%20Badge_en?$Mobile$"
            alt="Explore it on AppGallery"
            className="store-image"
          />
        </a>
      </div>
    </div>
  );
};

export default Download;
