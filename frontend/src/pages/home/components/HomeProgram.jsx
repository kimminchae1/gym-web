// src/pages/home/components/HomeProgram.jsx
import React from "react";
import Button from "../../../components/Button/Button";
import "./HomeProgram.css";

const HomeProgram = () => {
  return (
    <section className="home-program">
      <h2>운동 프로그램</h2>
      <div className="home-row">
        <div className="row g-4 justify-content-center">
          <div className="col-lg-4 col-md-6 col-12">
            <Button
              title="다양한 운동 기구"
              description="다양한 운동 기구로 체계적인 근력 운동 및 유산소 운동"
              imageSrc="/uploads/tranning.jpg"
              imageAlt="운동 기구"
              onClick={() => (window.location.href = "machine")}
            />
          </div>

          <div className="col-lg-4 col-md-6 col-12">
            <Button
              title="게시판 기능"
              description="필요한 건의사항을 게시판으로 건의 및 다양한 이벤트 참여"
              imageSrc="/uploads/running.jpg"
              imageAlt="게시판"
              onClick={() => (window.location.href = "post/list")}
            />
          </div>

          <div className="col-lg-4 col-md-6 col-12">
            <Button
              title="개인 맞춤 PT"
              description="1:1 맞춤형 운동 프로그램으로 효과적인 운동"
              imageSrc="/uploads/pt.jpg"
              imageAlt="PT"
              onClick={() => (window.location.href = "reservation")}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeProgram;
