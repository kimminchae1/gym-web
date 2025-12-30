// src/pages/reservation/components/TrainerProfiles.jsx
import React from "react";
import "./TrainerProfiles.css";

const TrainerProfiles = () => {
  const trainers = [
    {
      id: "list-item-1",
      name: "조상현",
      image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20250305_51%2F1741163766126f47L0_JPEG%2F%25C1%25FC%25C4%25C9%25BE%25EE_%25C1%25B6%25BB%25F3%25C7%25F6_%25C7%25C1%25B7%25CE%25C7%25CA.jpg"
    },
    {
      id: "list-item-2",
      name: "김도우",
      image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20250305_229%2F1741163752563woKjP_JPEG%2F%25C1%25FC%25C4%25C9%25BE%25EE_%25B1%25E8%25B5%25B5%25BF%25EC_%25C7%25C1%25B7%25CE%25C7%25CA.jpg"
    },
    {
      id: "list-item-3",
      name: "이주호",
      image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20250305_12%2F1741163762447W6lyl_PNG%2F%25C1%25FC%25C4%25C9%25BE%25EE_%25C0%25CC%25C1%25D6%25C8%25A3_%25C7%25C1%25B7%25CE%25C7%25CA.png"
    },
    {
      id: "list-item-4",
      name: "강현민",
      image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20250403_44%2F1743678298074jXnAa_JPEG%2F%25C1%25FC%25C4%25C9%25BE%25EE_%25B0%25AD%25C7%25F6%25B9%25CE_%25C7%25C1%25B7%25CE%25C7%25CA.jpg"
    }
  ];

  return (
    <div className="trainer-profiles">
      <div 
        className="scrollspy-example" 
        data-bs-spy="scroll" 
        data-bs-target="#list-example" 
        data-bs-smooth-scroll="true"
      >
        {trainers.map((trainer) => (
          <div key={trainer.id} id={trainer.id} className="trainer-section">
            <h4>{trainer.name}</h4>
            <img 
              src={trainer.image} 
              className="trainer-image" 
              alt={`${trainer.name} PT`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainerProfiles;
