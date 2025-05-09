import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";
import dotenv from "dotenv";
import { configDefaults } from "vitest/config";

dotenv.config();

const port = Number(process.env.VITE_PORT) || 5173;

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths({
      projects: [path.resolve(__dirname, "tsconfig.app.json")],
    }),
  ],
  server: {
    port,
  },
  preview: {
    port,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    exclude: [...configDefaults.exclude, "playwright/**"],
  },
});
