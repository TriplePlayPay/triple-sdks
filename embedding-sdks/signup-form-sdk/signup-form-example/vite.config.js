import { defineConfig } from "vite";
import { sri } from "vite-plugin-sri3";

export default defineConfig({
  plugins: [ sri() ],
});
