import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    {
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
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: false, // Disable minification for debugging
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@radix-ui/react-tabs', '@radix-ui/react-dialog'],
          utils: ['@supabase/supabase-js', '@tanstack/react-query']
        }
      }
    }
  },
  logLevel: 'info', // Set to 'info' for more verbose logging
  clearScreen: false, // Don't clear the screen
  optimizeDeps: {
    entries: ['src/**/*.{ts,tsx}'],
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@radix-ui/react-tabs',
      '@supabase/supabase-js'
    ]
  }
}); 