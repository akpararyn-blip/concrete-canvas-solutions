import { createFileRoute } from '@tanstack/react-router';
import { Anchor, Clock, Droplets, Maximize2, ScanLine, Users, Zap } from 'lucide-react';
import { ContactFormSection } from '@/components/ContactFormSection';
import { Reveal, Section } from '@/components/Section';

export const Route = createFileRoute('/installation')({
  head: () => ({
    meta: [
      { title: 'Технология монтажа бетонного полотна — пошаговая инструкция' },
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

const rules = [
  {
    icon: ScanLine,
    title: 'Избегайте пустот',
    text: 'Основание должно быть уплотнено и иметь равномерный профиль. Заполните все крупные пустоты и трещины перед укладкой.',
  },
  {
    icon: Anchor,
    title: 'Закрепите полотно',
    text: 'Надёжно зафиксируйте полотно к основанию стальными кольями или анкерами. Края закрепите в анкерные пазы.',
  },
  {
    icon: Maximize2,
    title: 'Обеспечьте прилегание',
    text: 'Полотно должно плотно прилегать по всему периметру. Не допускайте попадания воды или ветра под материал.',
  },
  {
    icon: Droplets,
    title: 'Достаточно воды',
    text: 'Смачивайте волокнистую поверхность до тех пор, пока она не будет оставаться влажной несколько минут. Переувлажнить невозможно.',
  },
];

const steps = [
  {
    num: '01',
    title: 'Подготовка основания',
    text: 'Уплотните и выровняйте поверхность. Удалите растительность и острые камни при укладке на грунт. При укладке на бетон — удалите слабые элементы, срежьте выступающую арматуру, заполните трещины и пустоты.',
    tip: 'Избегайте пустот — они ослабляют конструкцию',
  },
  {
    num: '02',
    title: 'Раскатка рулонов',
    text: 'Разверните рулоны вручную или с помощью техники. Каждый последующий слой укладывайте внахлёст в направлении потока воды. Минимальный нахлёст — 10 см.',
    tip: 'Направление нахлёста по потоку воды — обязательно',
  },
  {
    num: '03',
    title: 'Стыковка слоёв',
    text: 'Соедините полотна между собой саморезами из нержавеющей стали с одинаковыми интервалами. Альтернатива — термосварка для улучшенной герметичности. Дополнительно можно использовать клей-герметик в местах соединений.',
    tip: 'Саморезы из нержавеющей стали — не ржавеют под бетоном',
  },
  {
    num: '04',
    title: 'Фиксация к основанию',
    text: 'На грунте: стальные колья по периметру, края укладываются в анкерные пазы. На бетоне или камне: анкерные болты, грунтовые анкеры или строительный пистолет. Края по периметру закрепите бетонным раствором или клеем-герметиком.',
    tip: null,
  },
  {
    num: '05',
    title: 'Проверка прилегания',
    text: 'Убедитесь, что полотно плотно прилегает к основанию по всей площади. Особое внимание — периметру и местам стыков. Не допускайте попадания воды или ветра между полотном и основанием.',
    tip: 'Проверьте края перед увлажнением — после исправить сложнее',
  },
  {
    num: '06',
    title: 'Увлажнение',
    text: 'Смачивайте волокнистую поверхность водой до тех пор, пока она не будет оставаться влажной на ощупь несколько минут. Обязательно смочите области под стыками и края в анкерных пазах до их засыпки грунтом. Переувлажнить материал невозможно.',
    tip: 'Смочите скрытые участки и стыки до закапывания',
  },
];

function InstallationPage() {
  return (
    <>
      {/* Быстрые факты */}
      <Section
        eyebrow="Монтаж"
        title="Просто раскатайте и добавьте воды"
        description="Не требует опалубки, бетономешалок и квалифицированных бетонщиков. Монтаж ведётся в любую погоду — даже под водой."
      >
        <Reveal>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { icon: Zap,   value: '10×',          label: 'быстрее обычного бетона' },
              { icon: Users, value: '2–3',           label: 'человека в бригаде' },
              { icon: Clock, value: '24 ч',          label: 'до 80% прочности' },
              { icon: Maximize2, value: '200 м²/ч', label: 'скорость укладки' },
            ].map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center rounded-2xl border border-border bg-card p-5 text-center"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-brand text-brand-foreground mb-3">
                  <s.icon className="h-5 w-5" />
                </div>
                <div className="font-display text-2xl font-extrabold text-brand">{s.value}</div>
                <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* 4 главных правила */}
      <Section
        className="bg-surface"
        eyebrow="Ключевые правила"
        title="4 принципа успешного монтажа"
        description="Соблюдение этих правил гарантирует долговечность и герметичность покрытия на весь срок службы."
        center
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {rules.map((r, i) => (
            <Reveal key={r.title} style={{ transitionDelay: `${i * 80}ms` } as React.CSSProperties}>
              <div className="group h-full rounded-2xl border border-border bg-card p-6 text-center transition hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full gradient-brand text-brand-foreground transition group-hover:scale-110">
                  <r.icon className="h-8 w-8" />
                </div>
                <h3 className="mt-4 font-display text-base font-bold">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Пошаговая инструкция */}
      <Section
        eyebrow="Инструкция"
        title="Пошаговый монтаж"
        description="Подробное руководство по каждому этапу укладки бетонного полотна."
      >
        <div className="relative mx-auto max-w-3xl">
          {/* Вертикальная линия */}
          <div className="absolute left-7 top-0 h-full w-px bg-gradient-to-b from-brand via-border to-transparent" />

          <div className="space-y-5">
            {steps.map((s, i) => (
              <Reveal key={s.num} style={{ transitionDelay: `${i * 60}ms` } as React.CSSProperties}>
                <div className="relative flex gap-6">
                  {/* Номер */}
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full gradient-brand font-display text-lg font-extrabold text-brand-foreground shadow-sm z-10">
                    {s.num}
                  </div>

                  {/* Контент */}
                  <div className="flex-1 rounded-2xl border border-border bg-card p-6 transition hover:border-brand/30 hover:shadow-md">
                    <h3 className="font-display text-xl font-bold">{s.title}</h3>
                    <p className="mt-2 text-base leading-relaxed text-muted-foreground">{s.text}</p>
                    {s.tip && (
                      <div className="mt-4 flex items-start gap-2 rounded-xl bg-brand-soft px-4 py-2.5">
                        <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                        <p className="text-xs font-semibold text-brand-dark">{s.tip}</p>
                      </div>
                    )}
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
