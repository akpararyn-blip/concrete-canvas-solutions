import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Send } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Введите имя')
    .max(100, 'Слишком длинное имя'),
  phone: z
    .string()
    .trim()
    .min(10, 'Введите корректный номер')
    .max(30, 'Слишком длинный номер')
    .regex(/^[+\d\s()-]+$/, 'Только цифры, пробелы и + ( ) -'),
  details: z.string().trim().max(2000, 'Слишком длинное сообщение').optional(),
  consent: z.literal(true, { message: 'Необходимо согласие' }),
});

type FormData = z.infer<typeof schema>;

interface ContactFormProps {
  /** Показывать textarea с дополнительными деталями. По умолчанию true. */
  withDetails?: boolean;
}

export function ContactForm({ withDetails = true }: ContactFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { consent: false as unknown as true },
  });

  async function onSubmit(data: FormData) {
    setSubmitting(true);
    try {
      const res = await fetch('/handler.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          details: data.details ?? '',
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json?.success) {
        toast.success('Заявка отправлена', {
          description: 'Мы свяжемся с вами в рабочее время.',
        });
        reset();
      } else {
        toast.error('Не удалось отправить заявку', {
          description: 'Попробуйте позвонить нам или повторите позже.',
        });
      }
    } catch {
      toast.error('Ошибка сети', {
        description: 'Проверьте подключение и попробуйте снова.',
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-foreground">Ваше имя</label>
        <input
          {...register('name')}
          type="text"
          placeholder="Иван Иванов"
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
        />
        {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-foreground">Телефон</label>
        <input
          {...register('phone')}
          type="tel"
          placeholder="+7 (___) ___-__-__"
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
        />
        {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>}
      </div>

      {withDetails && (
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-foreground">
            Детали заявки <span className="font-normal text-muted-foreground">(необязательно)</span>
          </label>
          <textarea
            {...register('details')}
            rows={4}
            placeholder="Объём, сроки, особенности объекта…"
            className="w-full resize-y rounded-xl border border-border bg-background px-4 py-3 text-base outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
          {errors.details && (
            <p className="mt-1 text-xs text-destructive">{errors.details.message}</p>
          )}
        </div>
      )}

      <div>
        <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed text-muted-foreground">
          <input
            {...register('consent')}
            type="checkbox"
            className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-brand"
          />
          <span>
            Я соглашаюсь с{' '}
            <a
              href="/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand underline-offset-2 hover:underline"
            >
              пользовательским соглашением
            </a>{' '}
            и{' '}
            <a
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand underline-offset-2 hover:underline"
            >
              обработкой персональных данных
            </a>
            .
          </span>
        </label>
        {errors.consent && (
          <p className="mt-1 text-xs text-destructive">{errors.consent.message as string}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="flex w-full items-center justify-center gap-2 rounded-xl gradient-brand px-6 py-3.5 text-base font-bold text-brand-foreground transition hover:scale-[1.01] disabled:opacity-60"
        style={{ boxShadow: 'var(--shadow-brand)' }}
      >
        {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
        Отправить заявку
      </button>

      <p className="text-xs leading-relaxed text-muted-foreground">
        Ответим в рабочее время: Пн–Пт, 9:00–18:00.
      </p>
    </form>
  );
}
