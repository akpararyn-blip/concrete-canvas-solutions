import { createFileRoute } from '@tanstack/react-router';
import { Reveal, Section } from '@/components/Section';
import { SITE } from '@/lib/site';

export const Route = createFileRoute('/privacy')({
  head: () => ({
    meta: [
      { title: 'Политика обработки персональных данных — ЗЭМ Электровибромашина' },
      {
        name: 'description',
        content:
          'Политика обработки персональных данных сайта ООО ЗЭМ «Электровибромашина».',
      },
      { property: 'og:title', content: 'Политика обработки персональных данных' },
      { property: 'og:url', content: '/privacy' },
    ],
    links: [{ rel: 'canonical', href: '/privacy' }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <Section eyebrow="Документы" title="Политика обработки персональных данных">
      <Reveal>
        <div className="prose-doc">
          <p className="text-sm text-muted-foreground">
            Дата актуализации: {new Date().toLocaleDateString('ru-RU')}
          </p>

          <h2>1. Общие положения</h2>
          <p>
            Настоящая Политика обработки персональных данных составлена в соответствии с
            требованиями Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных» и
            определяет порядок обработки персональных данных и меры по обеспечению безопасности
            персональных данных, предпринимаемые {SITE.company} (далее — «Оператор»).
          </p>

          <h2>2. Основные понятия</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant
            morbi tristique senectus et netus et malesuada fames ac turpis egestas.
          </p>

          <h2>3. Цели обработки персональных данных</h2>
          <ul>
            <li>Обратная связь с пользователем по оставленным заявкам.</li>
            <li>Подготовка и направление коммерческих предложений.</li>
            <li>Заключение и исполнение договоров поставки.</li>
          </ul>

          <h2>4. Правовые основания обработки</h2>
          <p>
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
            curae; Sed aliquam, nisi quis porttitor congue, elit erat euismod orci.
          </p>

          <h2>5. Перечень обрабатываемых данных</h2>
          <p>
            Имя, контактный телефон, адрес электронной почты, содержание заявки. Дополнительные
            данные могут запрашиваться при заключении договора.
          </p>

          <h2>6. Порядок и сроки обработки</h2>
          <p>
            Donec sed odio dui. Aenean lacinia bibendum nulla sed consectetur. Cum sociis
            natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          </p>

          <h2>7. Права субъекта персональных данных</h2>
          <p>
            Пользователь вправе получить информацию об обработке своих данных, требовать их
            уточнения или удаления, отозвать согласие на обработку, направив запрос на{' '}
            {SITE.email}.
          </p>

          <h2>8. Контактные данные оператора</h2>
          <p>
            {SITE.company}, {SITE.address}. Email: {SITE.email}, телефон: {SITE.phonePrimary}.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
