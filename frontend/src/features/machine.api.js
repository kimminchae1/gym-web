import { api } from ".";

export const getMachines = () => api.get("/api/machines");

export const insertMachine = (formData) =>
  api.post("/api/machines/insert", formData);

export const updateMachine = (formData) =>
  api.post("/api/machines/update", formData);

export const editMachines = () => api.get("/api/machine_edit_form");

export const deleteMachine = () => api.delete("/api/machines/delete");
