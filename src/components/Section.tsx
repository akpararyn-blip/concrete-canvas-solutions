import type { ReactNode } from 'react';
import { useReveal } from '@/hooks/use-reveal';
import { cn } from '@/lib/utils';

interface Props {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Reveal({ children, className }: Props) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={cn('reveal', className)}>
      {children}
    </div>
  );
}

interface SectionProps extends Props {
  eyebrow?: string;
  title?: string;
  description?: string;
  center?: boolean;
}

export function Section({
  children,
  className,
  id,
  eyebrow,
  title,
  description,
  center,
}: SectionProps) {
  return (
    <section id={id} className={cn('py-16 lg:py-24', className)}>
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        {(eyebrow || title || description) && (
          <Reveal className={cn('mb-12 max-w-3xl', center && 'mx-auto text-center')}>
            {eyebrow && (
              <div className="mb-3 inline-flex items-center rounded-full bg-brand-soft px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-dark">
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl lg:text-5xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{description}</p>
            )}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
