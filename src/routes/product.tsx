import { createFileRoute } from '@tanstack/react-router';
import {
  CheckCircle2,
  Droplets,
  Layers,
  ShieldCheck,
  Beaker,
  Waves,
  Search,
  Shield,
  Zap,
  Package,
  Container,
  Timer,
  Mountain,
  FlaskConical,
  Truck,
  HeartPulse,
  Tractor,
  Building2,
  LifeBuoy,
} from 'lucide-react';
import { ContactFormSection } from '@/components/ContactFormSection';
import { Reveal, Section } from '@/components/Section';

export const Route = createFileRoute('/product')({
  head: () => ({
    meta: [
      { title: 'Продукция — CCT, CC Hydro, CCX, DEPLOY | Бетонное полотно' },
      {
        name: 'description',
        content:
          'Полное семейство бетонного полотна Concrete Canvas: CCT — универсальное решение, CC Hydro — герметичные экраны, CCX — облицовка гидросооружений, DEPLOY — быстровозводимые резервуары.',
      },
      { property: 'og:title', content: 'Продукция — CCT, CC Hydro, CCX, DEPLOY' },
      {
        property: 'og:description',
        content:
          'Четыре линейки Concrete Canvas: универсальный CCT, герметичный CC Hydro, крупноформатный CCX и быстровозводимые резервуары DEPLOY.',
      },
      { property: 'og:url', content: '/product' },
    ],
    links: [{ rel: 'canonical', href: '/product' }],
  }),
  component: ProductPage,
});

const family = [
  {
    key: 'cct',
    name: 'CCT',
    icon: Mountain,
    tagline: 'Универсальное строительное решение',
    text: 'Защита оснований и конструкций от разрушения и выветривания. Применяется на склонах, в водоотводных каналах, для подавления роста растительности.',
  },
  {
    key: 'cc-hydro',
    name: 'CC Hydro',
    icon: FlaskConical,
    tagline: 'Сдерживание реагентов',
    text: 'Разработан для проектов добычи и хранения полезных ископаемых: защитные обваловки, накопители, хвостовые тоннели.',
  },
  {
    key: 'ccx',
    name: 'CCX',
    icon: Waves,
    tagline: 'Масштабные гидросооружения',
    text: 'Новейшее дополнение к семейству CC. Облицовка крупных ирригационных каналов, защитных дамб и береговых склонов.',
  },
  {
    key: 'deploy',
    name: 'DEPLOY',
    icon: Container,
    tagline: 'Быстровозводимые резервуары',
    text: 'Инновационные резервуары для жидких продуктов на основе технологии ССНТ. Развёртывание за считанные часы.',
  },
];

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

const types = [
  {
    name: 'ССТ1™',
    gccm: 'GCCM Тип I',
    thickness: '5 мм',
    weight: '8 кг/м²',
    strength: '45 МПа',
    compactRoll: '1.0 × 10 м / 10 м²',
    bigRoll: '1.0 × 170 м / 170 м²',
    best: 'Лёгкие нагрузки, дренаж, подавление растительности',
  },
  {
    name: 'ССТ2™',
    gccm: 'GCCM Тип II',
    thickness: '7 мм',
    weight: '12 кг/м²',
    strength: '60 МПа',
    compactRoll: '1.1 × 4.55 м / 5 м²',
    bigRoll: '1.1 × 114 м / 125 м²',
    best: 'Укрепление склонов, каналы, дамбы',
    accent: true,
  },
  {
    name: 'ССТ3™',
    gccm: 'GCCM Тип III',
    thickness: '11 мм',
    weight: '19 кг/м²',
    strength: '65 МПа',
    compactRoll: '—',
    bigRoll: '1.1 × 73 м / 80 м²',
    best: 'Высокие нагрузки, промышленные объекты',
  },
];

const hydroTypes = [
  {
    name: 'ССНТ1™',
    gccm: 'CC Hydro Тип I',
    thickness: '6 мм',
    weight: '8 кг/м²',
    geomembrane: '1.0 мм (ПВХ)',
    bigRoll: '1.0 × 150 м / 150 м²',
    best: 'Противофильтрационные экраны, легкие химические нагрузки',
  },
  {
    name: 'ССНТ2™',
    gccm: 'CC Hydro Тип II',
    thickness: '8 мм',
    weight: '12 кг/м²',
    geomembrane: '1.0 мм (ПВХ)',
    bigRoll: '1.0 × 100 м / 100 м²',
    best: 'Объекты тяжелой промышленности, дамбы, резервуары',
    accent: true,
  },
];

const beforeHydration = [
  { param: 'Общая толщина', unit: 'мм', sst1: '5', sst2: '7', sst3: '11' },
  { param: 'Масса на единицу площади', unit: 'кг/м²', sst1: '8', sst2: '12', sst3: '19' },
  { param: 'Плотность', unit: 'кг/м³', sst1: '1550–1750', sst2: '1550–1750', sst3: '1550–1750' },
  { param: 'Рост плотности при затвердевании', unit: '%', sst1: '15–25', sst2: '15–25', sst3: '15–25' },
  { param: 'Рабочее время до начала схватывания', unit: 'часов', sst1: '<30', sst2: '1–2', sst3: '1–2' },
  { param: 'Сокращение выбросов CO₂', unit: '%', sst1: '62', sst2: '62', sst3: '62' },
];

const afterHydration = [
  { param: 'Прочность на сжатие', unit: 'МПа', sst1: '45', sst2: '60', sst3: '65' },
  { param: 'Начальная прочность (1 день)', unit: 'МПа', sst1: '>4.0', sst2: '>4.0', sst3: '>4.0' },
  { param: 'Предельная прочность (1 день)', unit: 'МПа', sst1: '10', sst2: '6', sst3: '6' },
  { param: 'Морозостойкость (остат. прочность после 200 циклов)', unit: '%', sst1: '80', sst2: '80', sst3: '80' },
  { param: 'Стойкость к УФ излучению', unit: '%', sst1: '>100', sst2: '>100', sst3: '>100' },
  { param: 'Стойкость к химическому воздействию', unit: '', sst1: 'Пройден', sst2: 'Пройден', sst3: 'Пройден' },
  { param: 'Сопротивление истиранию (глубина износа)', unit: 'мм/1000 ц', sst1: '0.15', sst2: '0.15', sst3: '0.15' },
  { param: 'Срок службы', unit: 'лет', sst1: '120', sst2: '120', sst3: '120' },
];

const productJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Бетонное полотно ГЦКМ (Concrete Canvas)',
  description:
    'Гибкий геосинтетический цементно-композитный мат. Раскатывается, поливается водой и через 24 часа набирает 80% прочности обычного бетона.',
  brand: {
    '@type': 'Brand',
    name: 'Concrete Canvas',
  },
  manufacturer: {
    '@type': 'Organization',
    name: 'ООО ЗЭМ «Электровибромашина»',
  },
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    priceCurrency: 'RUB',
    seller: {
      '@type': 'Organization',
      name: 'ООО ЗЭМ «Электровибромашина»',
    },
  },
  additionalProperty: [
    { '@type': 'PropertyValue', name: 'Срок службы', value: '120 лет' },
    { '@type': 'PropertyValue', name: 'Набор прочности', value: '80% за 24 часа' },
    { '@type': 'PropertyValue', name: 'Морозостойкость', value: '200+ циклов' },
    { '@type': 'PropertyValue', name: 'Скорость укладки', value: 'до 200 м²/час' },
    { '@type': 'PropertyValue', name: 'Снижение CO₂', value: '62%' },
  ],
};

function SpecTable({ title, rows, highlight }: {
  title: string;
  rows: { param: string; unit: string; sst1: string; sst2: string; sst3: string }[];
  highlight?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      <div className={`px-6 py-4 ${highlight ? 'gradient-brand' : 'bg-surface-2'}`}>
        <h3 className={`font-display text-base font-bold ${highlight ? 'text-brand-foreground' : 'text-foreground'}`}>
          {title}
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="w-1/2 px-5 py-3 text-left font-semibold text-muted-foreground bg-surface">
                Параметр
              </th>
              {(['ССТ1™', 'ССТ2™', 'ССТ3™'] as const).map((name, i) => (
                <th
                  key={name}
                  className={`px-4 py-3 text-center font-bold ${
                    i === 1
                      ? 'bg-brand-soft text-brand-dark'
                      : 'bg-surface text-foreground'
                  }`}
                >
                  {name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.param} className={`border-t border-border ${i % 2 === 0 ? 'bg-background' : 'bg-surface'}`}>
                <td className="px-5 py-3.5 text-foreground">
                  {r.param}
                  {r.unit && (
                    <span className="ml-1.5 text-xs text-muted-foreground">{r.unit}</span>
                  )}
                </td>
                <td className="px-4 py-3.5 text-center font-semibold text-brand-dark">{r.sst1}</td>
                <td className="px-4 py-3.5 text-center font-semibold text-brand-dark bg-brand-soft/30">{r.sst2}</td>
                <td className="px-4 py-3.5 text-center font-semibold text-brand-dark">{r.sst3}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ProductPage() {
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      {/* Что это такое */}
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
              className="w-full object-contain"
            />
          </Reveal>
          <Reveal>
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-foreground">
                <strong>Бетонное полотно</strong> — это гибкий композит, состоящий из трёхмерной
                полимерной сетки, заполненной сухой бетонной смесью. Снизу материал защищён
                водонепроницаемой геомембраной из ПВХ.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                После укладки полотно смачивается водой, после чего твердеет и образует прочный
                водонепроницаемый слой бетона заданной формы. Переувлажнить материал невозможно.
              </p>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: '200 м²/час', label: 'скорость укладки' },
                  { value: '−62% CO₂', label: 'vs обычного бетона' },
                  { value: 'в 5 раз', label: 'устойчивее к истиранию' },
                  { value: '120 лет', label: 'сертифицированный срок службы' },
                ].map((s) => (
                  <div key={s.label} className="rounded-2xl bg-surface border border-border p-4">
                    <div className="font-display text-xl font-extrabold text-brand">{s.value}</div>
                    <div className="mt-0.5 text-xs text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border-l-4 border-brand bg-brand-soft p-5">
                <p className="font-display text-base font-bold text-brand-dark">
                  Соответствует международному стандарту ASTM D8364 — единственный в России
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Три слоя */}
      <Section className="bg-surface" eyebrow="Состав" title="Три слоя — одна технология" center>
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

      {/* Типы ССТ */}
      <Section
        eyebrow="Типоразмеры"
        title="Три типа под любую задачу (Линейка ССТ)"
        description="Concrete Canvas выпускается в трёх типах по классификации ASTM D8364. Чем выше тип — тем толще полотно, тяжелее и прочнее."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {types.map((t, i) => (
            <Reveal key={t.name} style={{ transitionDelay: `${i * 80}ms` } as React.CSSProperties}>
              <div className={`relative flex flex-col h-full rounded-3xl border bg-card p-7 transition hover:-translate-y-1 hover:shadow-xl ${
                t.accent ? 'border-brand shadow-lg' : 'border-border'
              }`}>
                {t.accent && (
                  <div className="absolute right-4 top-4 rounded-full gradient-brand px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-foreground">
                    Популярный
                  </div>
                )}
                <div className="mb-6">
                  <div className="font-display text-3xl font-extrabold text-foreground">{t.name}</div>
                  <div className="mt-1 text-sm font-semibold text-brand">{t.gccm}</div>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="rounded-xl bg-surface p-3 text-center">
                    <div className="font-display text-xl font-extrabold text-brand whitespace-nowrap">{t.thickness}</div>
                    <div className="mt-0.5 text-xs text-muted-foreground">толщина</div>
                  </div>
                  <div className="rounded-xl bg-surface p-3 text-center">
                    <div className="font-display text-xl font-extrabold text-brand whitespace-nowrap">{t.weight}</div>
                    <div className="mt-0.5 text-xs text-muted-foreground">масса</div>
                  </div>
                  <div className="rounded-xl bg-surface p-3 text-center">
                    <div className="font-display text-xl font-extrabold text-brand whitespace-nowrap">{t.strength}</div>
                    <div className="mt-0.5 text-xs text-muted-foreground">прочность</div>
                  </div>
                </div>
                <div className="space-y-2 mb-6 flex-1">
                  <div className="flex justify-between text-sm border-b border-border pb-2">
                    <span className="text-muted-foreground">Компактный рулон</span>
                    <span className="font-semibold text-foreground text-right">{t.compactRoll}</span>
                  </div>
                  <div className="flex justify-between text-sm pt-1">
                    <span className="text-muted-foreground">Большой рулон</span>
                    <span className="font-semibold text-foreground text-right">{t.bigRoll}</span>
                  </div>
                </div>
                <div className="rounded-xl bg-brand-soft border border-brand/20 p-3">
                  <div className="text-xs font-semibold text-brand-dark">Применение:</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{t.best}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Спецлинейка CC Hydro */}
      <Section
        className="bg-surface"
        eyebrow="Спецлинейка"
        title="CC Hydro (ССНТ) — Максимальная герметичность"
        description="Сочетает технологию ГЦКМ и химически стойкую геомембрану (ПВХ 1.0 мм). Идеально для противофильтрационных экранов, тяжелой промышленности и агрессивных сред."
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 mb-10">
          {[
            { icon: Waves, title: 'Абсолютная герметичность', text: 'Проводимость свыше 1×10⁻¹² м/с для надежной изоляции.' },
            { icon: Beaker, title: 'Химическая стойкость', text: 'Устойчивость к агрессивным соединениям (нефтепродукты, кислоты).' },
            { icon: Search, title: 'Контроль качества', text: 'Сварочная полоса позволяет тестировать швы прямо на объекте.' },
            { icon: Shield, title: 'Максимальная защита', text: 'Бетонное покрытие защищает мембрану от проколов, УФ и животных.' },
          ].map((f, i) => (
            <Reveal key={f.title} style={{ transitionDelay: `${i * 80}ms` } as React.CSSProperties}>
              <div className="h-full rounded-2xl border border-border bg-card p-5 text-center transition hover:border-brand/50">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-soft text-brand-dark mb-4">
                  <f.icon className="h-6 w-6" />
                </div>
                <h4 className="font-display text-sm font-bold mb-2">{f.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2 max-w-4xl mx-auto">
          {hydroTypes.map((t, i) => (
            <Reveal key={t.name} style={{ transitionDelay: `${i * 80}ms` } as React.CSSProperties}>
              <div className={`relative flex flex-col h-full rounded-3xl border bg-card p-7 transition hover:-translate-y-1 hover:shadow-xl ${
                t.accent ? 'border-brand shadow-lg' : 'border-border'
              }`}>
                {t.accent && (
                  <div className="absolute right-4 top-4 rounded-full gradient-brand px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-foreground">
                    Популярный
                  </div>
                )}
                <div className="mb-6">
                  <div className="font-display text-3xl font-extrabold text-foreground">{t.name}</div>
                  <div className="mt-1 text-sm font-semibold text-brand">{t.gccm}</div>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="rounded-xl bg-surface p-3 text-center flex flex-col justify-center">
                    <div className="font-display text-xl font-extrabold text-brand whitespace-nowrap">{t.thickness}</div>
                    <div className="mt-0.5 text-xs text-muted-foreground">толщина</div>
                  </div>
                  <div className="rounded-xl bg-surface p-3 text-center flex flex-col justify-center">
                    <div className="font-display text-xl font-extrabold text-brand whitespace-nowrap">{t.weight}</div>
                    <div className="mt-0.5 text-xs text-muted-foreground">масса (сухая)</div>
                  </div>
                  <div className="rounded-xl bg-surface p-3 text-center flex flex-col justify-center">
                    <div className="font-display text-base font-extrabold text-brand leading-tight">{t.geomembrane}</div>
                    <div className="mt-0.5 text-xs text-muted-foreground">мембрана</div>
                  </div>
                </div>
                <div className="space-y-2 mb-6 flex-1">
                  <div className="flex justify-between items-center text-sm pt-1 pb-1 border-b border-border">
                    <span className="text-muted-foreground">Форма поставки</span>
                    <span className="font-semibold text-foreground text-right">{t.bigRoll}</span>
                  </div>
                </div>
                <div className="rounded-xl bg-brand-soft border border-brand/20 p-3">
                  <div className="text-xs font-semibold text-brand-dark">Применение:</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{t.best}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Технические таблицы */}
      <Section
        className="bg-background"
        eyebrow="Характеристики"
        title="Технические параметры"
        description="Данные испытаний согласно международным стандартам ASTM и BS EN."
      >
        <Reveal>
          <div className="space-y-4">
            <SpecTable title="До увлажнения (незатвердевший)" rows={beforeHydration} />
            <SpecTable title="После обработки (затвердевший)" rows={afterHydration} highlight />
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                value: '65 МПа',
                label: 'максимальная прочность на сжатие у ССТ3™ — выше марки бетона М600',
              },
              {
                value: '80%',
                label: 'остаточная прочность после 200 циклов заморозки — арктические условия',
              },
              {
                value: '>100%',
                label: 'стойкость к УФ — не разрушается на открытом воздухе десятилетиями',
              },
            ].map((s) => (
              <div key={s.label} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-brand mt-0.5" />
                <div>
                  <div className="font-display text-2xl font-extrabold text-brand">{s.value}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      <ContactFormSection className="bg-surface" title="Запросить технические данные и расчёт" />
    </>
  );
}
