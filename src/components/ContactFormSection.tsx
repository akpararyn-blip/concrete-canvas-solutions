import { ContactForm } from './ContactForm';
import { Reveal, Section } from './Section';
import { SITE } from '@/lib/site';
import { Phone } from 'lucide-react';

interface Props {
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
}

/**
 * Готовый блок «Оставить заявку» — единая форма + контактная подпись.
 * Используется в CTA-секциях всех страниц.
 */
export function ContactFormSection({
  eyebrow = 'Заявка',
  title = 'Рассчитайте стоимость для вашего объекта',
  description = 'Заполните форму — перезвоним в рабочее время и подготовим предложение.',
  className,
}: Props) {
  return (
    <Section className={className} eyebrow={eyebrow} title={title} description={description}>
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-muted-foreground">
              Опишите задачу — площадь, сроки, условия монтажа. Подберём оптимальный формат
              рулона и подготовим коммерческое предложение.
            </p>
            <a
              href={SITE.phonePrimaryHref}
              className="inline-flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-4 transition hover:border-brand/40"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl gradient-brand text-brand-foreground">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Или позвоните
                </div>
                <div className="font-display text-lg font-bold text-foreground">
                  {SITE.phonePrimary}
                </div>
              </div>
            </a>
          </div>
        </Reveal>

        <Reveal>
          <div
            className="rounded-3xl border border-border bg-card p-7 sm:p-8"
            style={{ boxShadow: 'var(--shadow-soft)' }}
          >
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
