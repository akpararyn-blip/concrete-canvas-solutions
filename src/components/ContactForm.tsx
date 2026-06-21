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
    .max(80, 'Слишком длинное имя'),
  phone: z
    .string()
    .trim()
    .min(10, 'Введите корректный номер')
    .max(20, 'Слишком длинный номер')
    .regex(/^[+\d\s()-]+$/, 'Только цифры, пробелы и + ( ) -'),
});

type FormData = z.infer<typeof schema>;

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(_data: FormData) {
    setSubmitting(true);
    // Заглушка: подключим Lovable Cloud + email позже
    await new Promise((r) => setTimeout(r, 700));
    toast.success('Заявка отправлена', {
      description: 'Мы свяжемся с вами в рабочее время.',
    });
    reset();
    setSubmitting(false);
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
        Нажимая «Отправить», вы соглашаетесь на обработку персональных данных.
        Ответим в рабочее время: Пн–Пт, 9:00–18:00.
      </p>
    </form>
  );
}
