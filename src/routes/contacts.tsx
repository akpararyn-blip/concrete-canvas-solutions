import { createFileRoute } from '@tanstack/react-router';
import { Clock, Mail, MapPin, Phone, Smartphone } from 'lucide-react';
import { ContactForm } from '@/components/ContactForm';
import { Reveal, Section } from '@/components/Section';
import { SITE } from '@/lib/site';

export const Route = createFileRoute('/contacts')({
  head: () => ({
    meta: [
      { title: 'Контакты — ООО ЗЭМ «Электровибромашина»' },
      {
        name: 'description',
        content:
          'Телефон 8 (863) 296-36-31, email zemEVM@inbox.ru. Юридический адрес: г. Новочеркасск, ул. Буденновская, 277. Форма обратной связи.',
      },
      { property: 'og:title', content: 'Контакты — ЗЭМ Электровибромашина' },
      { property: 'og:url', content: '/contacts' },
    ],
    links: [{ rel: 'canonical', href: '/contacts' }],
  }),
  component: ContactsPage,
});

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://xn--90aiayiacdcbbbi0bj.xn--p1acf/#organization',
  name: 'ООО ЗЭМ «Электровибромашина»',
  description:
    'Производство и продажа бетонного полотна (ГЦКМ / Concrete Canvas). Поставки по России и СНГ.',
  url: 'https://xn--90aiayiacdcbbbi0bj.xn--p1acf/#organization',
  telephone: '+78632963631',
  email: 'zemEVM@inbox.ru',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'ул. Буденновская, д. 277, этаж 2, комната 31',
    addressLocality: 'Новочеркасск',
    addressRegion: 'Ростовская область',
    postalCode: '346421',
    addressCountry: 'RU',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '47.412222',
    longitude: '40.106667',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+78632963631',
    contactType: 'sales',
    availableLanguage: 'Russian',
  },
};

function ContactsPage() {
  const items = [
    { icon: Phone, label: 'Основной телефон', value: SITE.phonePrimary, href: SITE.phonePrimaryHref },
    { icon: Smartphone, label: 'Мобильный', value: SITE.phoneMobile, href: SITE.phoneMobileHref },
    { icon: Mail, label: 'Email', value: SITE.email, href: SITE.emailHref },
    { icon: Clock, label: 'Часы работы', value: SITE.workingHours },
    { icon: MapPin, label: 'Адрес', value: SITE.address },
  ];

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />

      <Section
        eyebrow="Контакты"
        title="Свяжитесь с нами"
        description="Ответим на вопросы по продукту, подготовим коммерческое предложение и рассчитаем поставку под ваш объект."
      >
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <ul className="space-y-3">
              {items.map((it) => (
                <li
                  key={it.label}
                  className="flex gap-4 rounded-2xl border border-border bg-card p-5 transition hover:border-brand/40"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl gradient-brand text-brand-foreground">
                    <it.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {it.label}
                    </div>
                    {it.href ? (
                      <a
                        href={it.href}
                        className="mt-1 block font-display text-lg font-bold text-foreground hover:text-brand"
                      >
                        {it.value}
                      </a>
                    ) : (
                      <div className="mt-1 text-base font-semibold text-foreground">{it.value}</div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <div
              className="rounded-3xl border border-border bg-card p-7 sm:p-8"
              style={{ boxShadow: 'var(--shadow-soft)' }}
            >
              <h3 className="font-display text-2xl font-extrabold">Оставьте заявку</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Перезвоним в рабочее время и подготовим предложение.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="bg-surface" eyebrow="На карте" title="Как нас найти">
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-border shadow-lg">
            <iframe
              src={SITE.yandexMapSrc}
              title="ЗЭМ Электровибромашина на карте"
              width="100%"
              height="480"
              frameBorder={0}
              allowFullScreen
              className="block w-full"
            />
          </div>
        </Reveal>
      </Section>
    </>
  );
}
