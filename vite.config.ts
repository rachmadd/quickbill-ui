import path from 'path'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import autoprefixer from 'autoprefixer'
import tailwindcss from '@tailwindcss/postcss'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
  build: {
    minify: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'quickbill-ui',
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      // Make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [
        'clsx',
        'react',
        'react-dom',
        'sonner',
        'tailwind-merge',
        '@radix-ui/react-portal',
        '@radix-ui/react-separator',
        '@radix-ui/react-slot',
        '@tanstack/react-table',
        '@vitejs/plugin-react',
        'class-variance-authority',
        /^date-fns(\/.*)?$/,
        /^@date-fns(\/.*)?$/,
        /^react-day-picker(\/.*)?$/,
        /^dayjs(\/.*)?$/,
        'html2canvas',
        'jspdf',
        'tailwind-merge',
        'react-hook-form',
        /^@base-ui\/react(\/.*)?$/,
        'react-imask',
        'react-localization',
        'zod',
        '@hookform/resolvers',
      ],
      output: {
        // Provide global variables to use in the UMD build
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        banner: "'use client';",
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  plugins: [
    svgr({
      svgrOptions: {
        icon: true,
      },
    }),
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/style.css',
          dest: '',
          overwrite: true,
        },
        {
          src: 'src/preset-v3.js',
          dest: '',
          overwrite: true,
        },
        {
          src: 'src/preset-v4.css',
          dest: '',
          overwrite: true,
        },
      ],
    }),
    dts({
      exclude: ['src/stories/**'],
      insertTypesEntry: true,
    }),
    visualizer({
      filename: 'bundle-stats.html', // This file will be in your root folder
      open: true, // Automatically opens it in your browser after build
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
