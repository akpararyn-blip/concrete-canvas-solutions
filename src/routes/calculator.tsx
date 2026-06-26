import { createFileRoute } from '@tanstack/react-router';
import { Reveal, Section } from '@/components/Section';
import { Calculator } from '@/components/Calculator';

export const Route = createFileRoute('/calculator')({
  head: () => ({
    meta: [
      { title: 'Калькулятор бетонного полотна — расчёт рулонов и веса' },
      {
        name: 'description',
        content:
          'Рассчитайте количество рулонов и суммарный вес бетонного полотна по площади покрытия. Выберите формат (компактные или большие рулоны) и тип ССТ.',
      },
      { property: 'og:title', content: 'Калькулятор бетонного полотна' },
      { property: 'og:url', content: '/calculator' },
    ],
    links: [{ rel: 'canonical', href: '/calculator' }],
  }),
  component: CalculatorPage,
});

function CalculatorPage() {
  return (
    <Section
      eyebrow="Калькулятор"
      title="Рассчитайте количество рулонов"
      description="Выберите формат поставки и тип полотна, введите площадь покрытия — калькулятор покажет количество рулонов и суммарный вес материала."
    >
      <Reveal>
        <div className="mx-auto max-w-2xl">
          <Calculator />
        </div>
      </Reveal>
    </Section>
  );
}
