import { Link } from '@tanstack/react-router';
import { Menu, Phone, X } from 'lucide-react';
import { useState } from 'react';
import logo from '@/assets/logo.png.asset.json';
import { NAV, SITE } from '@/lib/site';

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-6">
        <Link to="/" className="flex shrink-0 items-center gap-3 transition hover:opacity-80">
          <img src={logo.url} alt="ЗЭМ Электровибромашина" className="h-10 w-auto lg:h-12" />
          <span className="hidden text-xs leading-tight text-muted-foreground sm:block">
            ООО ЗЭМ
            <br />
            «Электровибромашина»
          </span>
        </Link>

        <nav className="hidden items-center gap-1 xl:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === '/' }}
              activeProps={{ className: 'text-brand bg-brand-soft' }}
              className="rounded-full px-3 py-2 text-sm font-semibold text-foreground/80 transition-colors hover:text-brand"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <a
          href={SITE.phonePrimaryHref}
          className="hidden items-center gap-2 rounded-full gradient-brand px-5 py-2.5 text-sm font-bold text-brand-foreground shadow-brand transition hover:scale-[1.03] sm:flex"
          style={{ boxShadow: 'var(--shadow-brand)' }}
        >
          <Phone className="h-4 w-4" />
          {SITE.phonePrimary}
        </a>

        <button
          aria-label="Меню"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border xl:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background xl:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: n.to === '/' }}
                onClick={() => setOpen(false)}
                activeProps={{ className: 'text-brand bg-brand-soft' }}
                className="rounded-lg px-3 py-2.5 text-base font-semibold text-foreground/80"
              >
                {n.label}
              </Link>
            ))}
            <a
              href={SITE.phonePrimaryHref}
              className="mt-2 flex items-center justify-center gap-2 rounded-full gradient-brand px-4 py-3 text-sm font-bold text-brand-foreground"
            >
              <Phone className="h-4 w-4" />
              {SITE.phonePrimary}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
