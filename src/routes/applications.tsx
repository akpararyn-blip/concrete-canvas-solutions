import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { ImagePlaceholder } from '@/components/ImagePlaceholder';
import { Reveal, Section } from '@/components/Section';
import { applications } from '@/data/applications';

export const Route = createFileRoute('/applications')({
  head: () => ({
    meta: [
      { title: 'Сферы применения бетонного полотна — склоны, каналы, дамбы' },
      {
        name: 'description',
        content:
          'Укрепление склонов и берегов, облицовка каналов и прудов, противофильтрационные сооружения, защитные дамбы, ремонт бетонных конструкций.',
      },
      { property: 'og:title', content: 'Сферы применения бетонного полотна' },
      { property: 'og:url', content: '/applications' },
    ],
    links: [{ rel: 'canonical', href: '/applications' }],
  }),
  component: ApplicationsPage,
});



function ApplicationsPage() {
  return (
    <>
      <Section
        eyebrow="Применение"
        title="Где работает бетонное полотно"
        description="Инновационный материал открывает широкие возможности применения в гражданском, промышленном и гидротехническом строительстве. Узнайте больше о видах применения продукции Concrete Canvas ниже."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {applications.map((app, i) => (
            <Reveal key={app.title} style={{ transitionDelay: `${i * 40}ms` } as React.CSSProperties}>
              <div className="group h-full overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg">
                <img
                  src={app.img}
                  alt={app.title}
                  className="aspect-[16/10] w-full object-cover border-b border-border"
                />
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold">{app.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{app.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14">
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-surface p-8 sm:flex-row">
            <div>
              <div className="font-display text-xl font-bold">Не нашли свою задачу?</div>
              <p className="mt-1 text-muted-foreground">
                Опишите проект — подберём решение и форму поставки.
              </p>
            </div>
            <Link
              to="/contacts"
              className="inline-flex items-center gap-2 rounded-full gradient-brand px-6 py-3 text-sm font-bold text-brand-foreground transition hover:scale-[1.03]"
              style={{ boxShadow: 'var(--shadow-brand)' }}
            >
              Получить консультацию
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
