import React from "react";
import "./HomeIntro.css";

const HomeIntro = () => {
  return (
    <section className="home-intro">
      <div className="home-context">
        <h1>건강한 삶의 시작</h1>
        <p>당신의 피트니스 목표를 짐 케어 & PT에서 달성하세요</p>
        <img src="/uploads/home.png" alt="건강한 피트니스 라이프" />
      </div>
    </section>
  );
};

export default HomeIntro;
