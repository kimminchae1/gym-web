import { api } from ".";

export const getLoginPage = () => api.get("/api/login-page");
export const getRegisterPage = () => api.get("/api/register-page");
export const login = (userEmail, userPassword) =>
  api.post("/api/login", null, {
    params: { userEmail, userPassword },
  });
export const register = (data) => api.post("/api/register", data);
export const logout = () => api.post("/api/logout");
export const getMypage = () => api.get("/api/mypage");
export const updateUser = (data) => api.post("/api/update", data);
