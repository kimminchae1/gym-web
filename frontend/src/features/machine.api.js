import { api } from ".";

export const getMachines = () => api.get("/api/machines");
export const insertMachine = () => api.post("/insertMachine.do");
export const updateMachine = () => api.post("/updateMachine.do");
export const editMachines = () => api.get("/machine_edit_form.do");
export const deleteMachine = () => api.post("/deleteMachine.dos");
