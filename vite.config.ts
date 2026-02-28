import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
  ],

  // For local development and preview, use relative paths
  base: './',

  // When deploying to GitHub Pages, uncomment and update this:
  //base: '/evolvixweb/',

  // Optimize build
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          'react-three-fiber': ['@react-three/fiber'],
          'react-three-drei': ['@react-three/drei'],
          framer: ['framer-motion'],
        },
      },
    },
  },

  // Handle asset imports
  assetsInclude: ['**/*.gltf', '**/*.glb', '**/*.bin'],
})