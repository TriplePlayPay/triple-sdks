import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(import.meta.dirname, 'tpp-embedded-forms.js'),
      name: 'TripleSignupSDK',
      fileName: (format) => `sdk-signup-forms.${format}.js`,
      // just ship them all for now so apps can take their pick
      formats: [ "cjs", "es", "iife", "umd" ],
    },
  },
});
