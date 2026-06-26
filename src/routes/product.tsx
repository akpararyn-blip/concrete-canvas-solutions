import { createFileRoute } from '@tanstack/react-router';
import { Droplets, Layers, ShieldCheck } from 'lucide-react';
import { ContactFormSection } from '@/components/ContactFormSection';
import { ImagePlaceholder } from '@/components/ImagePlaceholder';
import { Reveal, Section } from '@/components/Section';

export const Route = createFileRoute('/product')({
  head: () => ({
    meta: [
      { title: 'О продукте — Бетонное полотно (ГЦКМ / Concrete Canvas)' },
      {
        name: 'description',
        content:
          'Бетонное полотно — гибкий композит из полимерной сетки и сухой бетонной смеси с водонепроницаемой геомембраной. Состав, принцип работы, технические характеристики.',
      },
      { property: 'og:title', content: 'О продукте — Бетонное полотно' },
      { property: 'og:url', content: '/product' },
    ],
    links: [{ rel: 'canonical', href: '/product' }],
  }),
  component: ProductPage,
});

const layers = [
  {
    icon: Layers,
    title: 'Трёхмерная полимерная сетка',
    text: 'Армирующая структура удерживает сухой цемент и придаёт материалу гибкость до твердения.',
  },
  {
    icon: ShieldCheck,
    title: 'Сухая бетонная смесь',
    text: 'Запатентованный состав, равномерно распределён по объёму. Активируется водой.',
  },
  {
    icon: Droplets,
    title: 'Водонепроницаемая геомембрана',
    text: 'Нижний слой обеспечивает гидроизоляцию и защищает основание от размыва.',
  },
];

const specs = [
  ['Расчётный срок службы', '120 лет'],
  ['Набор 80% прочности', '24 часа'],
  ['Морозостойкость', 'более 300 циклов'],
  ['Условия монтажа', 'любая погода, в т.ч. в воду'],
  ['Расход воды', 'не менее 50% от веса полотна'],
  ['Начало схватывания', '1–3 часа'],
];

function ProductPage() {
  return (
    <>
      <Section
        eyebrow="О продукте"
        title="Бетонное полотно — ГЦКМ"
        description="Геосинтетический цементно-композитный мат (Concrete Canvas) — инновационный материал, который объединяет прочность бетона с гибкостью рулонного покрытия."
      >
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <img
              src="/images/structure.png"
              alt="Структура бетонного полотна в разрезе"
              className="w-full object-contain rounded-2xl shadow-2xl"
            />
          </Reveal>
          <Reveal>
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-foreground">
                <strong>Бетонное полотно</strong> — это гибкий композит, состоящий из трёхмерной
                полимерной сетки, заполненной сухой бетонной смесью. Снизу материал защищён
                водонепроницаемой геомембраной.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                После укладки полотно смачивается водой, после чего твердеет и образует прочный
                водонепроницаемый слой бетона заданной формы. Переувлажнить материал невозможно.
              </p>
              <div className="rounded-2xl border-l-4 border-brand bg-brand-soft p-5">
                <p className="font-display text-lg font-bold text-brand-dark">
                  Один рулон заменяет объём бетона из двух 17-тонных миксеров
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section
        className="bg-surface"
        eyebrow="Состав"
        title="Три слоя — одна технология"
        center
      >
        <div className="grid gap-5 md:grid-cols-3">
          {layers.map((l, i) => (
            <Reveal key={l.title} style={{ transitionDelay: `${i * 80}ms` } as React.CSSProperties}>
              <div className="h-full rounded-2xl border border-border bg-card p-7">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl gradient-brand text-brand-foreground">
                  <l.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold">{l.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">{l.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section eyebrow="Характеристики" title="Технические параметры">
        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-border">
            <table className="w-full">
              <tbody>
                {specs.map(([k, v], i) => (
                  <tr
                    key={k}
                    className={i % 2 === 0 ? 'bg-surface' : 'bg-background'}
                  >
                    <td className="px-6 py-4 text-base font-semibold text-foreground">{k}</td>
                    <td className="px-6 py-4 text-right text-base font-bold text-brand-dark">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </Section>

      <ContactFormSection className="bg-surface" title="Запросить технические данные и расчёт" />
    </>
  );
}
