import { Link } from '@tanstack/react-router';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { NAV, SITE } from '@/lib/site';

export function Footer() {
  return (
    <footer className="mt-24 gradient-dark text-white/85">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 lg:grid-cols-4 lg:px-6">
        <div className="lg:col-span-1">
          <div className="font-display text-xl font-bold text-white">Бетонное полотно</div>
          <p className="mt-3 text-sm leading-relaxed text-white/65">
            {SITE.company} — поставка инновационного геосинтетического
            цементно-композитного мата.
          </p>
        </div>

        <div>
          <div className="mb-4 text-xs font-bold uppercase tracking-wider text-brand">Разделы</div>
          <ul className="space-y-2 text-sm">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="text-white/75 transition hover:text-white">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="mb-4 text-xs font-bold uppercase tracking-wider text-brand">Контакты</div>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              <div className="space-y-1">
                <a href={SITE.phonePrimaryHref} className="block hover:text-white">
                  {SITE.phonePrimary}
                </a>
                <a href={SITE.phoneMobileHref} className="block hover:text-white">
                  {SITE.phoneMobile}
                </a>
              </div>
            </li>
            <li className="flex gap-2.5">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              <a href={SITE.emailHref} className="hover:text-white">
                {SITE.email}
              </a>
            </li>
            <li className="flex gap-2.5">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              <span>{SITE.workingHours}</span>
            </li>
          </ul>
        </div>

        <div>
          <div className="mb-4 text-xs font-bold uppercase tracking-wider text-brand">Адрес</div>
          <div className="flex gap-2.5 text-sm">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
            <p className="leading-relaxed text-white/75">{SITE.address}</p>
          </div>
          <div className="mt-4 text-xs text-white/55">
            ИНН {SITE.requisites.inn} · ОГРН {SITE.requisites.ogrn}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-white/55 sm:flex-row lg:px-6">
          <span>© 2020 {SITE.requisites.shortName}. Все права защищены.</span>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
            <Link to="/terms" className="hover:text-white">
              Пользовательское соглашение
            </Link>
            <Link to="/privacy" className="hover:text-white">
              Персональные данные
            </Link>
            <Link to="/cookies" className="hover:text-white">
              Cookie
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
