import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:8080",
      "/login_firestore.do": "http://localhost:8080",
      "/write": "http://localhost:8080",
      "/list": "http://localhost:8080",
      "/deletePostComment": "http://localhost:8080",
      "/post": "http://localhost:8080",
      "/uploads": "http://localhost:8080",
    },
  },
});
