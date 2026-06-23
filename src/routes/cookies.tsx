import { createFileRoute } from '@tanstack/react-router';
import { Reveal, Section } from '@/components/Section';
import { SITE } from '@/lib/site';

export const Route = createFileRoute('/cookies')({
  head: () => ({
    meta: [
      { title: 'Политика cookie — ЗЭМ Электровибромашина' },
      {
        name: 'description',
        content: 'Политика использования файлов cookie на сайте ООО ЗЭМ «Электровибромашина».',
      },
      { property: 'og:title', content: 'Политика cookie' },
      { property: 'og:url', content: '/cookies' },
    ],
    links: [{ rel: 'canonical', href: '/cookies' }],
  }),
  component: CookiesPage,
});

function CookiesPage() {
  return (
    <Section eyebrow="Документы" title="Политика cookie">
      <Reveal>
        <div className="prose-doc">
          <p className="text-sm text-muted-foreground">
            Дата актуализации: {new Date().toLocaleDateString('ru-RU')}
          </p>

          <h2>1. Что такое cookie</h2>
          <p>
            Cookie — это небольшие текстовые файлы, которые сохраняются в браузере пользователя
            при посещении сайта. Они позволяют сайту запоминать действия и настройки
            пользователя (например, язык, размер шрифта) на определённый период времени.
          </p>

          <h2>2. Какие cookie мы используем</h2>
          <ul>
            <li>
              <b>Технические</b> — обеспечивают работу сайта (сессии, навигация).
            </li>
            <li>
              <b>Аналитические</b> — помогают понимать, как используется сайт (Яндекс.Метрика,
              Google Analytics).
            </li>
          </ul>

          <h2>3. Цели использования</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus ante dapibus
            diam. Nulla quis sem at nibh elementum imperdiet.
          </p>

          <h2>4. Управление cookie</h2>
          <p>
            Пользователь может в любой момент отключить или удалить cookie в настройках своего
            браузера. При отключении части cookie работа сайта может быть ограничена.
          </p>

          <h2>5. Контакты</h2>
          <p>
            По вопросам, связанным с использованием cookie, обращайтесь: {SITE.email}.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
