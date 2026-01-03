import { api } from ".";

export const getCommentsList = (poId) =>
  api.get("/api/comments/list", { params: { poId } });
export const writeComment = (data) => api.post("/api/comments/write", data);
export const deleteComment = (cmId) =>
  api.delete("/api/comments/delete", { params: { cmId } });
