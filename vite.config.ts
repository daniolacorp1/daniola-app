<<<<<<< HEAD
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
=======
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
>>>>>>> bb40e93b2458d77b4759d9b113168ee3706f38e3

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
<<<<<<< HEAD
      '@': path.resolve(__dirname, './src')
    }
  }
})
=======
      "@": path.resolve(__dirname, "./src"),
    },
  },
});   ``
>>>>>>> bb40e93b2458d77b4759d9b113168ee3706f38e3
