// Копирует handler.php и config.example.php в выходную папку статической сборки.
// Генерирует sitemap.xml, robots.txt и 404.html.
// Запускается после `vite build`.
import { existsSync, mkdirSync, copyFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const candidates = [
  'dist/client',
  'dist',
  '.output/public',
];

const outDir = candidates.map((p) => join(root, p)).find((p) => existsSync(p));

if (!outDir) {
  console.warn('[emit-php] output dir not found, skipping');
  process.exit(0);
}

mkdirSync(outDir, { recursive: true });

// --- PHP файлы ---
copyFileSync(join(__dirname, 'handler.template.php'), join(outDir, 'handler.php'));
copyFileSync(join(__dirname, 'config.example.php'), join(outDir, 'config.example.php'));

writeFileSync(
  join(outDir, 'DEPLOY.md'),
  `# Деплой на shared-хостинг

1. Содержимое этой папки залейте в \`public_html/\` хостинга.
2. Файл \`config.example.php\` переименуйте в \`config.php\` и переместите на **уровень выше** \`public_html/\`. Заполните SMTP-настройки, email-получателей и Telegram-токены.
3. Скачайте PHPMailer (https://github.com/PHPMailer/PHPMailer/releases) и положите папку \`PHPMailer/\` тоже на уровень выше \`public_html/\`.

Структура на хостинге:
\`\`\`
/site_root/
  config.php         <-- ваши настройки
  PHPMailer/         <-- библиотека
  public_html/       <-- содержимое сборки
    index.html
    handler.php
    ...
\`\`\`

Форма с сайта шлёт POST на \`/handler.php\` — он отправляет заявку на email и в Telegram.
`,
);

// --- Конфиг сайта ---
const DOMAIN = 'https://xn--90aiayiacdcbbbi0bj.xn--p1acf';

const routes = [
  { path: '/',             changefreq: 'weekly',  priority: '1.0' },
  { path: '/product',      changefreq: 'monthly', priority: '0.9' },
  { path: '/applications', changefreq: 'monthly', priority: '0.9' },
  { path: '/delivery',     changefreq: 'monthly', priority: '0.8' },
  { path: '/installation', changefreq: 'monthly', priority: '0.8' },
  { path: '/about',        changefreq: 'monthly', priority: '0.7' },
  { path: '/contacts',     changefreq: 'monthly', priority: '0.7' },
  { path: '/calculator',   changefreq: 'monthly', priority: '0.6' },
];

const today = new Date().toISOString().split('T')[0];

// --- sitemap.xml ---
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(r => `  <url>
    <loc>${DOMAIN}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

writeFileSync(join(outDir, 'sitemap.xml'), sitemap);
console.log('[emit-php] wrote sitemap.xml');

// --- robots.txt ---
const robots = `User-agent: *
Allow: /

Sitemap: ${DOMAIN}/sitemap.xml`;

writeFileSync(join(outDir, 'robots.txt'), robots);
console.log('[emit-php] wrote robots.txt');

// --- 404.html ---
const notFound = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Страница не найдена — Бетонное полотно ГЦКМ</title>
  <meta name="robots" content="noindex, nofollow" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: Inter, system-ui, sans-serif;
      background: #f8f9fc;
      color: #111827;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 2rem;
    }
    .wrap { text-align: center; max-width: 480px; }
    .code {
      font-size: 7rem;
      font-weight: 800;
      line-height: 1;
      background: linear-gradient(135deg, oklch(0.387 0.093 244.5), oklch(0.528 0.124 243.875));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    h1 { font-size: 1.5rem; font-weight: 700; margin: 1rem 0 0.5rem; }
    p { color: #6b7280; line-height: 1.6; margin-bottom: 2rem; }
    a {
      display: inline-block;
      padding: 0.75rem 2rem;
      border-radius: 9999px;
      background: linear-gradient(135deg, oklch(0.387 0.093 244.5), oklch(0.528 0.124 243.875));
      color: #fff;
      font-weight: 700;
      text-decoration: none;
      transition: opacity 0.2s;
    }
    a:hover { opacity: 0.85; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="code">404</div>
    <h1>Страница не найдена</h1>
    <p>Возможно, ссылка устарела или страница была перемещена.</p>
    <a href="/">На главную</a>
  </div>
</body>
</html>`;

writeFileSync(join(outDir, '404.html'), notFound);
console.log('[emit-php] wrote 404.html');

console.log(`[emit-php] done → ${outDir}`);
