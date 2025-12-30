import "./MachineForm.css";
import TextButton from "../../../components/Button/TextButton";

const MachineForm = ({ onClose }) => {
  return (
    <form className="machine_form">
      <section className="img_section">
        <h3>이미지</h3>
        <input type="file" />
      </section>
      <section className="name_section">
        <h3>이름</h3>
        <input type="text" />
      </section>
      <section className="date_section">
        <h3>구입일자</h3>
        <input type="date" />
      </section>
      <section className="cost_section">
        <h3>가격</h3>
        <input type="number" />
      </section>
      <section className="button_section">
        <TextButton text="저장" onClick={onClose} />
      </section>
    </form>
  );
};

export default MachineForm;
