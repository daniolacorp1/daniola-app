import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import type { Plugin } from 'vite';

// Debug plugin definition
const debugPlugin: Plugin = {
  name: 'debug',
  configResolved(config) {
    console.log('Vite config resolved:', JSON.stringify(config, null, 2));
  },
  buildStart() {
    console.log('Build starting...');
  },
  buildEnd() {
    console.log('Build ended');
  },
};

export default defineConfig({
  // React plugin and debug plugin
  plugins: [react(), debugPlugin],

  // Add resolve configuration for aliases
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@store': path.resolve(__dirname, './src/store'),
    }
  }
});