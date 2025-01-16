import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
 base: '/',
 plugins: [react()],
 server: {
   host: "::",
   port: 8080,
 },
 resolve: {
   alias: {
     "@": path.resolve(__dirname, "./src"),
   },
   extensions: ['.js', '.jsx', '.ts', '.tsx']
 },
 build: {
   outDir: 'dist',
   commonjsOptions: {
     include: [/node_modules/],
     transformMixedEsModules: true
   },
   rollupOptions: {
     output: {
       manualChunks: undefined
     }
   }
 }
});