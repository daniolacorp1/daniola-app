import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  // React plugin for Fast Refresh and other React-specific optimizations
  plugins: [react()],

  // Resolve configuration for path aliases and module resolution
  resolve: {
    alias: {
      // Allow absolute imports from src directory
      "@": path.resolve(__dirname, "./src"),
      // Ensure proper resolution for Radix UI components
      "@radix-ui/react-toast": "@radix-ui/react-toast",
      // Add other common aliases as needed
      "@components": path.resolve(__dirname, "./src/components"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
    // Explicitly define extensions to resolve
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  },

  // Dependency optimization
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020', // Adjust target based on browser support needs
    },
    include: [
      'react', 
      'react-dom', 
      '@radix-ui/react-toast',
      '@supabase/supabase-js', 
      '@tanstack/react-query'
    ],
    // Exclude packages that are problematic in pre-bundling
    exclude: ['@supabase/supabase-js']
  },

  // Build configuration
  build: {
    // Output directory for built files
    outDir: 'dist',
    
    // Disable source maps in production
    sourcemap: true,
    
    // Minification using Terser
    minify: 'terser',
    
    // Terser-specific options
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    
    // Rollup-specific build options
    rollupOptions: {
      // Advanced chunk splitting
      output: {
        // Manual chunk creation for better caching
        manualChunks(id) {
          // Split vendor dependencies into separate chunks
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'vendor';
            if (id.includes('@radix-ui')) return 'radix';
            if (id.includes('@supabase')) return 'supabase';
            return 'vendor'; // all other node_modules
          }
          
          // Specific chunk for utility libraries
          if (
            id.includes('@supabase') || 
            id.includes('@tanstack/react-query') || 
            id.includes('lodash')
          ) {
            return 'utils';
          }
          
          // Specific chunk for Radix UI components
          if (
            id.includes('@radix-ui/react-tabs')
          ) {
            return 'radix';
          }
        }
      }
    },
    
    // Chunk size warnings
    chunkSizeWarningLimit: 1000
  },

  // Development server configuration
  server: {
    port: 3000,
    open: true,
    cors: true,
    proxy: {
      // Example proxy configuration if needed
      // '/api': {
      //   target: 'http://localhost:8080',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, '')
      // }
    }
  },

  // Preview server configuration for testing production build
  preview: {
    port: 8080
  }
})