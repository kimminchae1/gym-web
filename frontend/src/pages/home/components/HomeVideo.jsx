import React from "react";
import "./HomeVideo.css";

const HomeVideo = () => {
  return (
    <section className="home-video-section">
      <video className="home-video" autoPlay muted controls>
        <source src="/uploads/mai.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </section>
  );
};

export default HomeVideo;
