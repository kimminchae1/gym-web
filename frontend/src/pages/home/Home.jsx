import React from "react";
import "./Home.css";
import Button from "../../components/Button";

const Home = () => {
  return (
    <div className="home-page">
      <div className="home-main">
        <div className="home-container">
          <section className="home-video-section">
            <video className="home-video" autoPlay muted controls>
              <source src="/video/mai.mp4" type="video/mp4" />
            </video>
          </section>

          <section className="home-section1">
            <div className="home-context">
              <h1>건강한 삶의 시작</h1>
              <p>당신의 피트니스 목표를 짐 케어 &amp; PT에서 달성하세요</p>
              <img src="/uploads/home.png" alt="home" />
            </div>
          </section>

          <section className="home-section2">
            <h2>운동 프로그램</h2>
            <div className="home-row">
              <div className="home-col">
                <Button
                  title="다양한 운동 기구"
                  description="다양한 운동 기구로 체계적인 근력 운동 및 유산소 운동"
                  imageSrc="/uploads/tranning.jpg"
                  imageAlt="운동 기구"
                  onClick={() => (window.location.href = "explainMachine.do")}
                />
              </div>

              <div className="home-col">
                <Button
                  title="게시판 기능"
                  description="필요한 건의사항을 게시판으로 건의 및 다양한 이벤트 참여"
                  imageSrc="/uploads/running.jpg"
                  imageAlt="게시판"
                  onClick={() => (window.location.href = "postBoard.do")}
                />
              </div>

              <div className="home-col">
                <Button
                  title="개인 맞춤 PT"
                  description="1:1 맞춤형 운동 프로그램으로 효과적인 운동"
                  imageSrc="/uploads/pt.jpg"
                  imageAlt="PT"
                  onClick={() => (window.location.href = "appointmentHome.do")}
                />
              </div>
            </div>
          </section>

          <section className="home-section3">
            <div className="home-machine">
              <h2>시설 안내</h2>
              <div
                id="carouselExampleDark"
                className="carousel carousel-dark slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner">
                  <div className="carousel-item active" data-bs-interval="10000">
                    <img
                      src="https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20250102_33%2F17358099935767D47h_JPEG%2FKakaoTalk_20250102_182537061_01.jpg"
                      className="d-block w-100"
                      alt="시설 1"
                    />
                  </div>
                  <div className="carousel-item" data-bs-interval="2000">
                    <img
                      src="https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20250102_277%2F17358099935664MAr8_JPEG%2FKakaoTalk_20250102_182537061_04.jpg"
                      className="d-block w-100"
                      alt="시설 2"
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src="https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20250102_136%2F17358099935376SJIv_JPEG%2FKakaoTalk_20250101_195953600_01.jpg"
                      className="d-block w-100"
                      alt="시설 3"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
