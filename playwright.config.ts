import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.VITE_PORT || "5173";

export default defineConfig({
  testDir: "./playwright/tests",
  use: {
    baseURL: `http://localhost:${port}`,
    headless: true,
  },
});
