import { createFileRoute } from '@tanstack/react-router';
import { Reveal, Section } from '@/components/Section';
import { SITE } from '@/lib/site';

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [
      { title: 'О компании — ООО ЗЭМ «Электровибромашина»' },
      {
        name: 'description',
        content:
          'ООО ЗЭМ «Электровибромашина» — производство и продажа бетонного полотна. Реквизиты компании, юридический адрес, контакты.',
      },
      { property: 'og:title', content: 'О компании ЗЭМ Электровибромашина' },
      { property: 'og:url', content: '/about' },
    ],
    links: [{ rel: 'canonical', href: '/about' }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const r = SITE.requisites;
  const rows: [string, string][] = [
    ['Полное наименование', r.fullName],
    ['Сокращённое наименование', r.shortName],
    ['Юридический адрес', SITE.address],
    ['ИНН', r.inn],
    ['КПП', r.kpp],
    ['ОГРН', r.ogrn],
    ['ОКАТО', r.okato],
    ['ОКОГУ', r.okogu],
    ['ОКПО', r.okpo],
    ['ОКВЭД', r.okved],
    ['ОКФС', r.okfs],
    ['ОКОПФ', r.okopf],
    ['Директор', r.director],
  ];

  return (
    <>
      <Section
        eyebrow="Компания"
        title="ООО ЗЭМ «Электровибромашина»"
        description="Производство и продажа бетонного полотна. Поставляем инновационный геосинтетический цементно-композитный мат для строительных, гидротехнических и инфраструктурных проектов по всей России."
      >
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ['Производство', 'Собственные мощности'],
            ['География', 'Поставки по РФ и СНГ'],
            ['Опыт', 'Промышленные объекты и инфраструктура'],
          ].map(([k, v], i) => (
            <Reveal key={k} style={{ transitionDelay: `${i * 60}ms` } as React.CSSProperties}>
              <div className="rounded-2xl border border-border bg-surface p-6">
                <div className="text-xs font-bold uppercase tracking-wider text-brand">{k}</div>
                <div className="mt-2 font-display text-lg font-bold">{v}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-surface" eyebrow="Реквизиты" title="Юридическая информация">
        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-border bg-background">
            <table className="w-full">
              <tbody>
                {rows.map(([k, v], i) => (
                  <tr key={k} className={i % 2 === 0 ? 'bg-background' : 'bg-surface'}>
                    <td className="w-1/3 px-4 py-3.5 align-top text-sm font-semibold text-muted-foreground sm:px-6">
                      {k}
                    </td>
                    <td className="px-4 py-3.5 align-top text-sm text-foreground sm:px-6">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
