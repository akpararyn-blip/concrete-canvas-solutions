// Копирует handler.php и config.example.php в выходную папку статической сборки.
// Запускается postbuild после `vite build`.
import { existsSync, mkdirSync, copyFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const candidates = [
  '.output/public',
  'dist',
  'dist/client',
];

const outDir = candidates.map((p) => join(root, p)).find((p) => existsSync(p));

if (!outDir) {
  console.warn('[emit-php] output dir not found, skipping handler.php emit');
  process.exit(0);
}

mkdirSync(outDir, { recursive: true });

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

console.log(`[emit-php] wrote handler.php, config.example.php, DEPLOY.md to ${outDir}`);
