import "./MachineModal.css";
import TextButton from "../../../components/Button/TextButton";
import { useState } from "react";
import { updateMachine } from "../../../features/machine.api";

const MachineEdit = ({ machine, onClose }) => {
  const [input, setInput] = useState({
    machineName: machine.machineName,
    machinePurchaseDate: machine.machinePurchaseDate,
    machinePrice: machine.machinePrice,
    file: null,
  });

  const onChangeInput = (e) => {
    const { name, value, files } = e.target;

    setInput({
      ...input,
      [name]: files ? files[0] : value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (
      !input.machineName ||
      !input.machinePurchaseDate ||
      !input.machinePrice
    ) {
      return alert("모든 항목을 입력하세요.");
    }

    const formData = new FormData();

    formData.append("machineId", machine.machineId);
    if (input.file) {
      formData.append("file", input.file);
    }
    formData.append("machineName", input.machineName);
    formData.append("machinePurchaseDate", input.machinePurchaseDate);
    formData.append("machinePrice", input.machinePrice);

    try {
      await updateMachine(formData);
      onClose();
      window.location.reload();
    } catch (err) {
      console.error("등록 실패", err);
    }

    onClose();
  };

  return (
    <form className="machine_form" onSubmit={onSubmit}>
      <div className="form_header">
        <h2>기구 수정</h2>
      </div>

      <section className="img_section">
        <h3>이미지</h3>
        <input type="file" name="file" onChange={onChangeInput} />
      </section>

      <section className="name_section">
        <h3>이름</h3>
        <input
          type="text"
          name="machineName"
          onChange={onChangeInput}
          value={input.machineName}
        />
      </section>

      <section className="date_section">
        <h3>구입일자</h3>
        <input
          type="date"
          name="machinePurchaseDate"
          onChange={onChangeInput}
          value={input.machinePurchaseDate}
        />
      </section>

      <section className="cost_section">
        <h3>가격</h3>
        <input
          type="number"
          name="machinePrice"
          onChange={onChangeInput}
          value={input.machinePrice}
          max="999999999"
        />
      </section>

      <section className="button_section edit">
        <TextButton text="수정" type="submit" />
        <TextButton text="삭제" type="button" className="danger" />
      </section>
    </form>
  );
};

export default MachineEdit;
