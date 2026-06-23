import { createFileRoute } from '@tanstack/react-router';
import { Reveal, Section } from '@/components/Section';
import { SITE } from '@/lib/site';

export const Route = createFileRoute('/terms')({
  head: () => ({
    meta: [
      { title: 'Пользовательское соглашение — ЗЭМ Электровибромашина' },
      {
        name: 'description',
        content:
          'Пользовательское соглашение сайта по продаже бетонного полотна ООО ЗЭМ «Электровибромашина».',
      },
      { property: 'og:title', content: 'Пользовательское соглашение' },
      { property: 'og:url', content: '/terms' },
    ],
    links: [{ rel: 'canonical', href: '/terms' }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <Section eyebrow="Документы" title="Пользовательское соглашение">
      <Reveal>
        <div className="prose-doc">
          <p className="text-sm text-muted-foreground">
            Дата актуализации: {new Date().toLocaleDateString('ru-RU')}
          </p>

          <h2>1. Общие положения</h2>
          <p>
            Настоящее Пользовательское соглашение (далее — «Соглашение») регулирует отношения
            между {SITE.company} (далее — «Компания») и пользователем сайта в сети Интернет
            (далее — «Пользователь»). Используя сайт, Пользователь подтверждает согласие со
            всеми условиями настоящего Соглашения.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Maecenas
            tristique, eros sed congue ultricies, magna velit sodales massa, sed pretium urna
            ipsum et lectus.
          </p>

          <h2>2. Термины и определения</h2>
          <p>
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
          </p>

          <h2>3. Предмет соглашения</h2>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
            qui officia deserunt mollit anim id est laborum.
          </p>

          <h2>4. Права и обязанности сторон</h2>
          <p>
            Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis
            et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin
            mauris.
          </p>
          <ul>
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Consectetur adipiscing elit.</li>
            <li>Sed do eiusmod tempor incididunt.</li>
          </ul>

          <h2>5. Ответственность сторон</h2>
          <p>
            Praesent placerat risus quis eros. Fusce pellentesque suscipit nibh. Integer
            vitae libero ac risus egestas placerat.
          </p>

          <h2>6. Контактные данные</h2>
          <p>
            {SITE.company}, {SITE.address}. Email: {SITE.email}, телефон: {SITE.phonePrimary}.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
