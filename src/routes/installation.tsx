import { createFileRoute } from '@tanstack/react-router';
import { ContactFormSection } from '@/components/ContactFormSection';
import { Reveal, Section } from '@/components/Section';

export const Route = createFileRoute('/installation')({
  head: () => ({
    meta: [
      { title: 'Технология монтажа бетонного полотна — 6 шагов' },
      {
        name: 'description',
        content:
          'Пошаговая инструкция монтажа бетонного полотна: подготовка, раскатка, крепление, стыковка, гидратация, твердение. Без опалубки и спецтехники.',
      },
      { property: 'og:title', content: 'Технология монтажа бетонного полотна' },
      { property: 'og:url', content: '/installation' },
    ],
    links: [{ rel: 'canonical', href: '/installation' }],
  }),
  component: InstallationPage,
});

const steps = [
  {
    title: 'Подготовка',
    text: 'Очистка поверхности от растительности и острых предметов, трамбовка грунта.',
  },
  {
    title: 'Раскатка',
    text: 'Развертывание рулонов вручную или техникой с обязательным нахлёстом в 10 см.',
  },
  {
    title: 'Крепление',
    text: 'Фиксация к грунту с помощью стальных анкеров.',
  },
  {
    title: 'Стыковка',
    text: 'Скрепление полотен между собой саморезами с шагом 10–20 см.',
  },
  {
    title: 'Гидратация',
    text: 'Обильный полив водой — расход не менее 50% от веса полотна. Переувлажнить материал невозможно.',
  },
  {
    title: 'Твердение',
    text: 'Схватывание начинается через 1–3 часа. Через 24 часа — 80% прочности.',
  },
];

function InstallationPage() {
  return (
    <>
      <Section
        eyebrow="Монтаж"
        title="6 шагов от рулона до прочного бетонного покрытия"
        description="Не требует опалубки, миксеров и квалифицированных бетонщиков. Бригада из 2–3 человек укладывает сотни м² в смену."
      >
        <div className="relative mx-auto max-w-4xl">
          <div className="absolute left-6 top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-brand via-border to-transparent sm:left-8" />
          <div className="space-y-6">
            {steps.map((s, i) => (
              <Reveal key={s.title} style={{ transitionDelay: `${i * 60}ms` } as React.CSSProperties}>
                <div className="relative flex gap-5 rounded-2xl border border-border bg-card p-6 transition hover:border-brand/40 hover:shadow-lg sm:gap-7 sm:p-7">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full gradient-brand font-display text-xl font-extrabold text-brand-foreground shadow-brand sm:h-16 sm:w-16 sm:text-2xl">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="font-display text-xl font-bold sm:text-2xl">{s.title}</h3>
                    <p className="mt-2 text-base leading-relaxed text-muted-foreground">{s.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <ContactFormSection className="bg-surface" title="Заказать поставку и консультацию по монтажу" />
    </>
  );
}
