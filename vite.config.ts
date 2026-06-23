// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// SSG-конфигурация: prerender всех маршрутов и статический preset для shared-хостинга.
// Внутри Lovable preset форсится в cloudflare (preview работает); локальный `bun run build`
// даёт чистую статику в `.output/public/`.
export default defineConfig({
  tanstackStart: {
    pages: [
      { path: "/", prerender: { enabled: true, crawlLinks: true } },
    ],
  },
  nitro: {
    preset: "static",
  },
});
