// vite.config.js
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePluginNode } from 'vite-plugin-node';

export default defineConfig({
  target: 'node18',
  outDir: 'dist',
  rollupOptions: {
    input: 'src/main.ts',
    external: ['node_modules'],
  },
  plugins: [
    tsconfigPaths(),
    ...VitePluginNode({
      appPath: 'src/main.ts',
    }),
  ],
  test: {
    testTimeout: 10000,
  },
});
