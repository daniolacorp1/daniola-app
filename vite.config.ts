import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Debug plugin definition
const debugPlugin = {
  name: 'debug',
  configResolved(config: import('vite').ResolvedConfig) {
    console.log('Vite config resolved:', JSON.stringify(config, null, 2));
  },
  buildStart() {
    console.log('Build starting...');
  },
  buildEnd() {
    console.log('Build ended');
  }
} satisfies Plugin;

// Configuration
export default defineConfig({
  plugins: [react(), debugPlugin],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@store': path.resolve(__dirname, './src/store'),
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    }
  }
});