import { useEffect, useState } from "react";
import { getMachines } from "../features/machine.api";

// React식 사고 순서
// 화면에 필요한 값이 뭐지? → state
// 언제 받아와야 하지? → effect
// 값 바뀌면 다시 그려야지 → re-render

// useMachine hook 에서 할 일
// 운동기구 목록이 뭐야?
// 아직 로딩 중이야?
// 언제 서버에 요청해?

const useMachine = () => {
  // 1. 상태 선언
  const [machines, setMachine] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. useEffect → getMachines 호출
  useEffect(() => {
    getMachines()
      .then((res) => {
        console.log("res.data:", res.data);
        setMachine(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // 3. 상태 return
  return { machines, loading };
};

export default useMachine;
