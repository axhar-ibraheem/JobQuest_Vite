import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";
import path from "path";

export default defineConfig({
  plugins: [react(), checker({ typescript: true })],
  resolve: {
    alias: {
      "@jobquest/components": path.resolve(__dirname, "src/app/_components"),
      "@jobquest/shared": path.resolve(__dirname, "src/app/_shared"),
      "@jobquest/models": path.resolve(__dirname, "src/app/_models"),
      "@jobquest/hooks": path.resolve(__dirname, "src/app/_hooks"),
      "@jobquest/context": path.resolve(__dirname, "src/app/_context"),
      "@jobquest/constants": path.resolve(__dirname, "src/app/_constants"),
      "@jobquest/utils": path.resolve(__dirname, "src/app/_utils"),
      "@jobquest/routes": path.resolve(__dirname, "src/app/_routes"),
      "@jobquest/data": path.resolve(__dirname, "src/app/_data"),
      "@jobquest/assets": path.resolve(__dirname, "src/assets"),
    },
  },
  esbuild: {
    logOverride: { "this-is-undefined-in-esm": "silent" },
  },
});
