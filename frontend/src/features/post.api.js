import { api } from ".";

export const getPostsBoard = (page = 1) => api.get("/api/posts/board", { params: { page } });
export const getPostDetail = (poId) => api.get("/api/posts", { params: { poId } });
export const getPostWritePage = () => api.get("/api/posts/write");
export const createPost = (data) => api.post("/api/posts/write", data);
export const getPostEdit = (poId) => api.get("/api/posts/edit", { params: { poId } });
export const updatePost = (data) => api.post("/api/posts/edit", data);
export const deletePost = (poId) => api.delete("/api/posts/delete", { params: { poId } });
export const likePost = (poId) => api.post("/api/posts/like", null, { params: { poId } });
export const dislikePost = (poId) => api.post("/api/posts/dislike", null, { params: { poId } });
