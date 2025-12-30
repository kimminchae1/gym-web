// src/pages/reservation/components/TrainerList.jsx
import React from "react";
import "./TrainerList.css";

const TrainerList = () => {
  const trainers = [
    { id: "list-item-1", name: "조상현" },
    { id: "list-item-2", name: "김도우" },
    { id: "list-item-3", name: "이주호" },
    { id: "list-item-4", name: "강현민" }
  ];

  return (
    <div className="trainer-sidebar">
      <div id="list-example" className="list-group">
        {trainers.map((trainer) => (
          <a 
            key={trainer.id}
            className="list-group-item" 
            href={`#${trainer.id}`}
          >
            {trainer.name}
          </a>
        ))}
      </div>
      <img 
        src="https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20250818_216%2F17554876646808id2d_PNG%2FKakaoTalk_20250818_122642330.png" 
        className="center-image" 
        alt="센터 이미지"
      />
    </div>
  );
};

export default TrainerList;
