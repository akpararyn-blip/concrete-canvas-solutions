import { createFileRoute } from '@tanstack/react-router';
import { ContactFormSection } from '@/components/ContactFormSection';
import { ImagePlaceholder } from '@/components/ImagePlaceholder';
import { Reveal, Section } from '@/components/Section';

export const Route = createFileRoute('/delivery')({
  head: () => ({
    meta: [
      { title: 'Формы поставки бетонного полотна — компактные, большие, широкие рулоны' },
      {
        name: 'description',
        content:
          'Три формата рулонов бетонного полотна: компактные до 50 кг, большие до 125 м² и широкие до 1500 кг. Подбор под объект и условия монтажа.',
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
    weight: 'до 50 кг',
    bullets: [
      'Переносятся 1–2 рабочими вручную',
      'Оптимальны для труднодоступных мест',
      'В лесу, под трубами, в стеснённых условиях',
    ],
  },
  {
    name: 'Большие рулоны',
    weight: 'до 125 м²',
    bullets: [
      'Монтаж с помощью экскаватора и траверсы',
      'Подходят для открытых промышленных площадок',
      'Высокая скорость покрытия больших площадей',
    ],
    accent: true,
  },
  {
    name: 'Широкие рулоны',
    weight: 'ширина 1.95 м · длина 50 м · до 1500 кг',
    bullets: [
      'Максимальная скорость укладки',
      'Сокращение количества швов на 40%',
      'Для крупных объектов и протяжённых линейных объектов',
    ],
  },
];

function DeliveryPage() {
  return (
    <>
      <Section
        eyebrow="Формы поставки"
        title="Три формата под задачи объекта"
        description="Выбирайте размер и вес рулона под условия монтажа — от ручной переноски в труднодоступных местах до промышленной укладки на километры."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {forms.map((f, i) => (
            <Reveal key={f.name} style={{ transitionDelay: `${i * 80}ms` } as React.CSSProperties}>
              <div
                className={`relative h-full overflow-hidden rounded-3xl border bg-card transition hover:-translate-y-1 hover:shadow-xl ${
                  f.accent ? 'border-brand shadow-lg' : 'border-border'
                }`}
              >
                {f.accent && (
                  <div className="absolute right-4 top-4 z-10 rounded-full gradient-brand px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-foreground">
                    Популярно
                  </div>
                )}
                <ImagePlaceholder
                  label={f.name}
                  aspect="aspect-[4/3]"
                  className="rounded-none border-0 border-b"
                />
                <div className="p-7">
                  <h3 className="font-display text-2xl font-extrabold">{f.name}</h3>
                  <div className="mt-2 text-sm font-semibold text-brand">{f.weight}</div>
                  <ul className="mt-5 space-y-2.5">
                    {f.bullets.map((b) => (
                      <li key={b} className="flex gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <ContactFormSection className="bg-surface" title="Подобрать формат под ваш объект" />
    </>
  );
}
