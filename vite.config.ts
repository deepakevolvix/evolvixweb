import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // For local development and preview, use relative paths
  //base: './',

  // When deploying to GitHub Pages, uncomment and update this:
  base: '/evolvixweb/',

  // Optimize build
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },

  // Handle asset imports
  assetsInclude: ['**/*.gltf', '**/*.glb', '**/*.bin'],
})