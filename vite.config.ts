import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const isBuild = process.argv.includes('build');

export default defineConfig({
  nitro: !isBuild,
  tanstackStart: {
    prerender: isBuild ? {
      enabled: true,
      crawlLinks: true,
    } : {
      enabled: false,
    },
    pages: isBuild ? [
      { path: '/' },
      { path: '/product' },
      { path: '/applications' },
      { path: '/delivery' },
      { path: '/installation' },
      { path: '/contacts' },
      { path: '/about' },
      { path: '/calculator' },
    ] : undefined,
  },
  vite: {
    build: {
      outDir: 'dist',
    },
  },
});