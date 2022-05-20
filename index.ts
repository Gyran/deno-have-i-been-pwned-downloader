import download from './src/index.ts';

await download({ overwrite: false, concurrency: 128 });
