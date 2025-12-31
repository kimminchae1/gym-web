// src/pages/home/components/HomeFacility.jsx
import React, { useState, useEffect } from "react";
import "./HomeFacility.css";

const HomeFacility = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const images = [
    {
      src: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20250102_33%2F17358099935767D47h_JPEG%2FKakaoTalk_20250102_182537061_01.jpg",
      alt: "첨단 운동 시설"
    },
    {
      src: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20250102_277%2F17358099935664MAr8_JPEG%2FKakaoTalk_20250102_182537061_04.jpg",
      alt: "편안한 휴게 공간"
    },
    {
      src: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20250102_136%2F17358099935376SJIv_JPEG%2FKakaoTalk_20250101_195953600_01.jpg",
      alt: "깔끔한 라커룸"
    }
  ];

  // 자동 슬라이드
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 4000); // 4초마다 변경
    
    return () => clearInterval(interval);
  }, [images.length]);

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  return (
    <section className="home-facility">
      <div className="home-machine">
        <h2>시설 안내</h2>
        <div className="custom-carousel">
          {/* 👈 현재 슬라이드 하나만 표시 */}
          <img
            src={images[currentSlide].src}
            className="carousel-img"
            alt={images[currentSlide].alt}
          />
          
          {/* 좌우 버튼 */}
          <button className="carousel-prev" onClick={goToPrev}>
            ‹
          </button>
          <button className="carousel-next" onClick={goToNext}>
            ›
          </button>
          
          {/* 현재 슬라이드 인디케이터 */}
          <div className="carousel-dots">
            {images.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeFacility;
