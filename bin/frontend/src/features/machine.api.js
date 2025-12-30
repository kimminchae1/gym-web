import { api } from ".";

export const getMachines = () => api.get("/api/machines");
export const insertMachine = () => api.post("/api/machines/insert");
export const updateMachine = () => api.post("/api/machines/update");
export const editMachines = () => api.get("/api/machine_edit_form");
export const deleteMachine = () => api.delete("/api/machines/delete");
