import "./MachineList.css";
import useMachine from "../../../hooks/useMachine";

const MachineList = () => {
  const { machines, loading } = useMachine();

  if (loading) return <div>로딩중...!</div>;

  return (
    <div className="machine_list">
      {machines.map((m) => (
        <div className="machine_card" key={m.machineId}>
          <div className="machine_img">
            <img src={`/uploads/${m.machineImg}`} alt={m.machineName} />
          </div>
          <div className="machine_info">
            <div className="machine_name">{m.machineName}</div>
            <div className="machine_date">{m.machinePurchaseDate}</div>
            <div className="machine_cost">
              {m.machinePrice.toLocaleString()}원
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MachineList;
