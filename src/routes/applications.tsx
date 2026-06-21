import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { ImagePlaceholder } from '@/components/ImagePlaceholder';
import { Reveal, Section } from '@/components/Section';

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

const items = [
  {
    title: 'Защита склонов',
    text: 'Укрепление откосов и насыпей, защита от эрозии грунта и осыпания. Подходит для дорог, ж/д и промышленных объектов.',
  },
  {
    title: 'Облицовка каналов',
    text: 'Гидроизоляция оросительных, дренажных и сточных каналов. Снижает потери воды и продлевает срок эксплуатации.',
  },
  {
    title: 'Подавление растительности',
    text: 'Создаёт плотное непроницаемое покрытие, исключающее рост сорняков на технологических площадках.',
  },
  {
    title: 'Противофильтрационные сооружения',
    text: 'Защита от утечек в накопителях жидкостей, прудах-отстойниках, технологических водоёмах.',
  },
  {
    title: 'Защитные дамбы',
    text: 'Быстрое возведение и укрепление защитных насыпей в зонах подтопления и паводков.',
  },
  {
    title: 'Ремонт',
    text: 'Восстановление повреждённых бетонных труб, лотков, обвалований и резервуаров без демонтажа.',
  },
  {
    title: 'Укрепление траншей и колодцев',
    text: 'Внутренняя облицовка колодцев, котлованов и траншей — без опалубки и сложной техники.',
  },
  {
    title: 'Защита трубопроводов',
    text: 'Укрепление откосов водопропускных труб и защита наружной поверхности магистральных трубопроводов.',
  },
  {
    title: 'Бетонные палатки (CC Hydro)',
    text: 'Быстровозводимые укрытия и временные сооружения с прочным водонепроницаемым корпусом.',
  },
];

function ApplicationsPage() {
  return (
    <>
      <Section
        eyebrow="Применение"
        title="Где работает бетонное полотно"
        description="Инновационный материал открывает широкие возможности применения в гражданском, промышленном и гидротехническом строительстве. Узнайте больше о видах применения продукции Concrete Canvas ниже."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.title} style={{ transitionDelay: `${i * 40}ms` } as React.CSSProperties}>
              <div className="group h-full overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg">
                <ImagePlaceholder label={it.title} aspect="aspect-[16/10]" className="rounded-none border-0 border-b" />
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold">{it.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.text}</p>
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
