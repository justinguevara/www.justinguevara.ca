import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig({
  base: './',
  resolve: {
    alias: {
      components: path.resolve(__dirname, './src/components'),
      services: path.resolve(__dirname, './src/services')
    },
  },
  plugins: [
    react(), tsconfigPaths()
  ],
  build: {
    cssMinify: 'esbuild'
  },
  server: {
    watch: {
      usePolling: true
    },
  },
});