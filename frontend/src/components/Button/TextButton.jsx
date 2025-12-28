import "./TextButton.css";

const TextButton = ({ text, onClick, type = "button" }) => {
  return (
    <button type={type} onClick={onClick} className="Button">
      {text}
    </button>
  );
};

export default TextButton;
