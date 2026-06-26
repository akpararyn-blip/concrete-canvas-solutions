import { createFileRoute, Link } from '@tanstack/react-router';
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  CloudRain,
  Leaf,
  Snowflake,
  Wrench,
  Zap,
} from 'lucide-react';
import { useEffect, useRef } from 'react';
import { ContactFormSection } from '@/components/ContactFormSection';
import { Reveal, Section } from '@/components/Section';
import { applications } from '@/data/applications';
import { SITE } from '@/lib/site';

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Бетонное полотно ГЦКМ — производство и продажа | ЗЭМ Электровибромашина' },
      {
        name: 'description',
        content:
          'Бетонное полотно (Concrete Canvas) от производителя. Монтаж в 10× быстрее бетона, 80% прочности за 24 часа, срок службы 120 лет. Доставка по России.',
      },
      { property: 'og:title', content: 'Бетонное полотно ГЦКМ — производство и продажа' },
      {
        property: 'og:description',
        content:
          'Гибкий цементно-композитный мат для укрепления склонов, каналов и берегов. Монтаж в любую погоду.',
      },
      { property: 'og:url', content: '/' },
    ],
    links: [{ rel: 'canonical', href: '/' }],
  }),
  component: HomePage,
});

const advantages = [
  { icon: Zap,       value: '10×',     label: 'быстрее обычной заливки бетона' },
  { icon: Calendar,  value: '24 ч',    label: 'набор 80% прочности' },
  { icon: Wrench,    value: '120 лет', label: 'расчётный срок службы' },
  { icon: Snowflake, value: '200+',    label: 'циклов замораживания/оттаивания' },
  { icon: CloudRain, value: 'Любая',   label: 'погода для монтажа, даже под водой' },
  { icon: Leaf,      value: '−60%',    label: 'выбросов CO₂ vs обычного бетона' },
];

function HomePage() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const interval = setInterval(() => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= maxScroll - 10) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: 196, behavior: 'smooth' });
      }
    }, 2500);

    const pause = () => clearInterval(interval);
    el.addEventListener('touchstart', pause, { passive: true });

    return () => {
      clearInterval(interval);
      el.removeEventListener('touchstart', pause);
    };
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-surface">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              'radial-gradient(60% 60% at 80% 10%, oklch(0.69 0.15 217 / 0.18), transparent), radial-gradient(50% 50% at 10% 100%, oklch(0.22 0.04 255 / 0.08), transparent)',
          }}
        />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 lg:grid-cols-2 lg:gap-8 lg:px-6 lg:py-24">
          <Reveal className="flex flex-col justify-center">
            <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-brand/30 bg-brand-soft px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-dark">
              <span className="h-2 w-2 rounded-full bg-brand" /> Завод по производству и поставке в России
            </div>
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Бетонное полотно —
              <br />
              <span className="bg-gradient-to-r from-brand to-brand-dark bg-clip-text text-transparent">
                бетон, который катится в рулоне
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Гибкий геосинтетический цементно-композитный мат (ГЦКМ / Concrete Canvas).
              Раскатывается, поливается водой и через 24 часа набирает 80% прочности обычного
              бетона.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contacts"
                className="inline-flex items-center gap-2 rounded-full gradient-brand px-6 py-3.5 text-base font-bold text-brand-foreground transition hover:scale-[1.03]"
                style={{ boxShadow: 'var(--shadow-brand)' }}
              >
                Запросить расчёт
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/product"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-base font-bold text-foreground transition hover:border-brand hover:text-brand"
              >
                О продукте
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-6">
              {advantages.slice(0, 3).map((a) => (
                <div key={a.label}>
                  <div className="font-display text-2xl font-extrabold text-brand sm:text-3xl">
                    {a.value}
                  </div>
                  <div className="mt-1 text-xs leading-tight text-muted-foreground">{a.label}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="relative">
            <img
              src="/images/hero-main.jpg"
              alt="Рулон бетонного полотна на объекте"
              className="aspect-[4/5] lg:aspect-square w-full rounded-2xl object-cover shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-border bg-background p-5 shadow-xl sm:block">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full gradient-brand text-brand-foreground">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-sm font-bold">Готово к работе</div>
                  <div className="text-xs text-muted-foreground">через 24 часа после монтажа</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ПРЕИМУЩЕСТВА */}
      <Section
        eyebrow="Преимущества"
        title="Бетон без опалубки, миксеров и сложной техники"
        description="ГЦКМ объединяет преимущества бетона и геосинтетики — прочность, гибкость и скорость укладки."
      >
        {/* Десктоп — сетка */}
        <div className="hidden gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((a, i) => (
            <Reveal key={a.label} style={{ transitionDelay: `${i * 60}ms` } as React.CSSProperties}>
              <div className="group h-full rounded-2xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-brand text-brand-foreground transition group-hover:scale-110">
                  <a.icon className="h-6 w-6" />
                </div>
                <div className="mt-5 font-display text-3xl font-extrabold text-foreground">
                  {a.value}
                </div>
                <div className="mt-2 text-base text-muted-foreground">{a.label}</div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Мобилка — автоскролл */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-3 sm:hidden snap-x snap-proximity"
        >
          {advantages.map((a) => (
            <div
              key={a.label}
              className="snap-start shrink-0 w-44 rounded-2xl border border-border bg-card p-5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-brand text-brand-foreground">
                <a.icon className="h-5 w-5" />
              </div>
              <div className="mt-4 font-display text-2xl font-extrabold text-foreground">{a.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{a.label}</div>
            </div>
          ))}
        </div>
        {/* CTA к странице о продукте */}
        <Reveal>
          <div className="mt-10 relative overflow-hidden rounded-3xl gradient-brand p-8 sm:p-10">
            {/* Декоративные круги */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/5" />
            <div className="pointer-events-none absolute -bottom-12 right-32 h-40 w-40 rounded-full bg-white/5" />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-brand-foreground/60 mb-2">
                  Технология
                </div>
                <h3 className="font-display text-2xl font-extrabold text-brand-foreground sm:text-3xl">
                  Как бетон оказался в рулоне?
                </h3>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-brand-foreground/70">
                  Три слоя, один стандарт ASTM D8364 и 120 лет срока службы —
                  разберём состав, типы и технические характеристики.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {['45–65 МПа прочность', '−62% CO₂', '200 м²/час монтаж'].map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-brand-foreground/20 bg-brand-foreground/10 px-3 py-1 text-xs font-semibold text-brand-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                to="/product"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-foreground px-6 py-3.5 text-sm font-bold text-brand transition hover:scale-[1.03] hover:bg-white"
              >
                О продукте
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ПРИМЕНЕНИЕ */}
      <Section
        className="bg-surface"
        eyebrow="Применение"
        title="Где используется бетонное полотно"
        description="От укрепления береговых линий до ремонта инженерных сооружений — материал решает задачи, где обычный бетон слишком долог или невозможен."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {applications.slice(0, 6).map((app, i) => (
            <Reveal key={app.label} style={{ transitionDelay: `${i * 50}ms` } as React.CSSProperties}>
              <Link
                to="/applications"
                className="group block overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg"
              >
                <img
                  src={app.img}
                  alt={app.label}
                  className="aspect-[16/10] w-full object-cover"
                />
                <div className="flex items-center justify-between p-5">
                  <span className="font-display text-lg font-bold text-foreground">{app.label}</span>
                  <ArrowRight className="h-5 w-5 text-brand transition group-hover:translate-x-1" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA с формой */}
      <ContactFormSection
        className="bg-surface"
        eyebrow="Заявка"
        title="Рассчитайте стоимость для вашего объекта"
        description="Отправьте параметры — подберём оптимальную форму поставки и подготовим коммерческое предложение."
      />
    </>
  );
}
