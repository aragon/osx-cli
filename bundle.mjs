import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['src/main.ts'],
  bundle: true,
  platform: 'node',
  minify: true,
  sourcemap: 'external',
  outfile: 'dist/main.js',
  loader: { '.node': 'file' },
  external: ['figlet'], // Exclude figlet from the bundle
});
