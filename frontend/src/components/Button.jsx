import React from "react";
import "./Button.css";

const Button = ({ title, description, imageSrc, imageAlt, onClick }) => {
  return (
    <button className="custom-card-button" onClick={onClick}>
      <h3>{title}</h3>
      <p>{description}</p>
      <img src={imageSrc} alt={imageAlt} />
    </button>
  );
};

export default Button;
