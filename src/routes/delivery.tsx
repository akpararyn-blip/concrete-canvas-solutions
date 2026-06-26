import { createFileRoute } from '@tanstack/react-router';
import { ContactFormSection } from '@/components/ContactFormSection';
import { Reveal, Section } from '@/components/Section';
import { Calculator } from '@/components/Calculator';

export const Route = createFileRoute('/delivery')({
  head: () => ({
    meta: [
      { title: 'Формы поставки бетонного полотна — компактные и большие рулоны' },
      {
        name: 'description',
        content:
          'Два формата рулонов бетонного полотна: компактные для ручного монтажа и большие для промышленной укладки. Три типа ССТ — толщина 5, 7 и 11 мм.',
      },
      { property: 'og:title', content: 'Формы поставки бетонного полотна' },
      { property: 'og:url', content: '/delivery' },
    ],
    links: [{ rel: 'canonical', href: '/delivery' }],
  }),
  component: DeliveryPage,
});

const forms = [
  {
    name: 'Компактные рулоны',
    img: '/images/compact.png',
    tagline: 'Для ручного монтажа',
    accent: false,
    bullets: [
      'Переносятся 1–2 рабочими вручную',
      'Оптимальны для труднодоступных мест',
      'В лесу, под трубами, в стеснённых условиях',
    ],
    specs: [
      { type: 'ССТ1™', thickness: '5 мм', weight: '8 кг/м²', area: '10 м²', length: '10 м' },
      { type: 'ССТ2™', thickness: '7 мм', weight: '12 кг/м²', area: '5 м²', length: '4,55 м' },
      { type: 'ССТ3™', thickness: '11 мм', weight: '19 кг/м²', area: '—', length: '—' },
    ],
  },
  {
    name: 'Широкие рулоны',
    img: '/images/wide.png',
    tagline: 'Максимальная ширина покрытия',
    bullets: [
      'Ширина 1.95 м — минимум продольных швов',
      'Длина 50 м — быстрое покрытие без стыков',
      'Монтаж с помощью экскаватора и траверсы',
    ],
    specs: [
      { type: 'ССТ1™', thickness: '5 мм', weight: '8 кг/м²', area: '97.5 м²', length: '50 м' },
      { type: 'ССТ2™', thickness: '7 мм', weight: '12 кг/м²', area: '97.5 м²', length: '50 м' },
      { type: 'ССТ3™', thickness: '11 мм', weight: '19 кг/м²', area: '97.5 м²', length: '50 м' },
    ],
  },
  {
    name: 'Большие рулоны',
    img: '/images/big.png',
    tagline: 'Для промышленной укладки',
    bullets: [
      'Монтаж с помощью экскаватора и траверсы',
      'Подходят для открытых промышленных площадок',
      'Высокая скорость покрытия больших площадей',
    ],
    specs: [
      { type: 'ССТ1™', thickness: '5 мм', weight: '8 кг/м²', area: '170 м²', length: '170 м' },
      { type: 'ССТ2™', thickness: '7 мм', weight: '12 кг/м²', area: '125 м²', length: '114 м' },
      { type: 'ССТ3™', thickness: '11 мм', weight: '19 кг/м²', area: '80 м²', length: '73 м' },
    ],
  },
];

function DeliveryPage() {
  return (
    <>
      {/* Карточки форматов */}
      <Section
        eyebrow="Формы поставки"
        title="Два формата под задачи объекта"
        description="Бетонное полотно поставляется в компактных и больших рулонах. В каждом формате доступны три типа полотна — ССТ1™, ССТ2™ и ССТ3™ — отличающиеся толщиной и площадью покрытия."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {forms.map((f, i) => (
            <Reveal key={f.name} style={{ transitionDelay: `${i * 80}ms` } as React.CSSProperties}>
              <div
                className={`relative flex flex-col h-full overflow-hidden rounded-3xl border bg-card transition hover:-translate-y-1 hover:shadow-xl ${
                  f.accent ? 'border-brand shadow-lg' : 'border-border'
                }`}
              >
                {f.accent && (
                  <div className="absolute right-4 top-4 z-10 rounded-full gradient-brand px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-foreground">
                    Популярно
                  </div>
                )}
                <img
                  src={f.img}
                  alt={f.name}
                  className="aspect-[16/9] w-full object-contain border-b border-border p-4"
                />
                <div className="flex flex-col flex-1 p-7">
                  <h3 className="font-display text-2xl font-extrabold">{f.name}</h3>
                  <div className="mt-1.5 text-sm font-semibold text-brand">{f.tagline}</div>

                  <ul className="mt-5 space-y-2.5 flex-1">
                    {f.bullets.map((b) => (
                      <li key={b} className="flex gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 overflow-hidden rounded-2xl border border-border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-surface-2 text-foreground">
                          <th className="px-3 py-2.5 text-left font-bold">Тип</th>
                          <th className="px-3 py-2.5 text-center font-bold">Площадь</th>
                          <th className="px-3 py-2.5 text-center font-bold">Длина</th>
                        </tr>
                      </thead>
                      <tbody>
                        {f.specs.map((s, idx) => (
                          <tr
                            key={s.type}
                            className={`border-t border-border ${
                              idx % 2 === 0 ? 'bg-background' : 'bg-surface'
                            }`}
                          >
                            <td className="px-3 py-2.5">
                              <div className="font-bold text-brand-dark">{s.type}</div>
                              <div className="text-xs text-muted-foreground">{s.thickness} · {s.weight}</div>
                            </td>
                            <td className="px-3 py-2.5 text-center font-semibold text-foreground">{s.area}</td>
                            <td className="px-3 py-2.5 text-center text-muted-foreground">{s.length}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Калькулятор */}
      <Section
        className="bg-surface"
        eyebrow="Калькулятор"
        title="Сколько нужно материала?"
      >
        <div className="grid items-start gap-12 lg:grid-cols-2">
          {/* Левая колонка — маркетинг */}
          <Reveal>
            <div className="space-y-8">
              <p className="text-lg leading-relaxed text-muted-foreground">
                Введите площадь объекта — калькулятор мгновенно покажет количество рулонов
                и суммарный вес. Никаких заявок, никакого ожидания.
              </p>

              <div className="space-y-5">
                {[
                  {
                    step: '1',
                    title: 'Выберите формат рулона',
                    desc: 'Компактные — для ручного монтажа, большие — для техники',
                  },
                  {
                    step: '2',
                    title: 'Укажите тип полотна',
                    desc: 'ССТ1™ (5 мм), ССТ2™ (7 мм) или ССТ3™ (11 мм) — в зависимости от нагрузки',
                  },
                  {
                    step: '3',
                    title: 'Введите площадь в м²',
                    desc: 'Получите количество рулонов и вес — мгновенно',
                  },
                ].map((s) => (
                  <div key={s.step} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl gradient-brand text-brand-foreground text-sm font-extrabold">
                      {s.step}
                    </div>
                    <div>
                      <div className="font-bold text-foreground">{s.title}</div>
                      <div className="mt-0.5 text-sm text-muted-foreground">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border-l-4 border-brand bg-card p-5">
                <p className="text-sm font-semibold text-foreground">
                  Один рулон заменяет{' '}
                  <span className="text-brand">два 17-тонных миксера</span> —
                  доставка любым грузовиком, монтаж за часы
                </p>
              </div>
            </div>
          </Reveal>

          {/* Правая колонка — калькулятор */}
          <Reveal>
            <Calculator />
          </Reveal>
        </div>
      </Section>

      <ContactFormSection className="bg-surface" title="Подобрать формат под ваш объект" />
    </>
  );
}
