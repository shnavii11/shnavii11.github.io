import { defineConfig } from 'vite';

export default defineConfig({
  // Project site served at https://shnavii11.github.io/portfolio-vaishnavi/
  base: '/portfolio-vaishnavi/',
  server: {
    port: 5173,
    host: true,
    open: false,
  },
});
