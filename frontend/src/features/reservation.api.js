import { api } from ".";

export const getReservation = () => api.get("/api/reservations");
export const getAppointmentHome = () => api.get("/api/reservations/home");
export const insertReservation = (data) => api.post("/api/reservations/insert", data);
export const getDashboard = (page = 1) => api.get("/api/reservations/dashboard", { params: { page } });
export const completeReservation = (id) => api.post("/api/reservations/complete", null, { params: { id } });
