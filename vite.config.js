import { defineConfig } from 'vite';

export default defineConfig({
  // User site served at https://shnavii11.github.io/
  base: '/',
  server: {
    port: 5173,
    host: true,
    open: false,
  },
});
