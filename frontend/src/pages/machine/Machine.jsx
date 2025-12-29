import { useState } from "react";

import PageLayout from "../../components/layout/PageLayout";
import MachineList from "./components/MachineList";
import MachineForm from "./components/MachineForm";
import TextButton from "../../components/Button/TextButton";
import "./Machine.css";

const Machine = () => {
  // 나중에 로그인 정보로 교체
  const isAdmin = true;
  const [showForm, setShowForm] = useState(false);

  const closeModal = () => {
    setShowForm(false);
  };

  return (
    <PageLayout>
      <MachineList />

      {/** 관리자이고 true, 지금 모달이 열려있지 않다면 false -> 기구 등록 버튼을 보여줘*/}
      {isAdmin && !showForm && (
        <TextButton text="기구 등록" onClick={() => setShowForm(true)} />
      )}

      {/** 앞이 true면, 뒤를 실행해라*/}
      {showForm && (
        <div className="modal-backdrop">
          <div className="modal">
            <button className="modal-close" onClick={closeModal}>
              ✕
            </button>
            {/** MachineForm 에서 닫아야 할 일이 생기면 이 함수를 실행해*/}
            <MachineForm onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default Machine;
