import "./TextButton.css";

const TextButton = ({ text, onClick, type = "button", className = "" }) => {
  return (
    <button type={type} onClick={onClick} className={`Button ${className}`}>
      {text}
    </button>
  );
};

export default TextButton;
