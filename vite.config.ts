import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';
import viteTSConfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  // This changes the out put dir from dist to build
  // comment this out if that isn't relevant for your project
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests.ts'
  },
  build: {
    outDir: 'build'
  },
  plugins: [
    react(),
    svgrPlugin({
      svgrOptions: {
        icon: true
        // ...svgr options (https://react-svgr.com/docs/options/)
      }
    }),
    viteTSConfigPaths()
  ]
});
