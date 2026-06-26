import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowRight, AlertTriangle, Package, Weight, Truck } from 'lucide-react';

type Format = 'compact' | 'big' | 'wide';
type SSTType = 'sst1' | 'sst2' | 'sst3';

const data: Record<Format, Record<SSTType, { area: number | null; weightPerM2: number; thickness: string }>> = {
  compact: {
    sst1: { area: 10,   weightPerM2: 8,  thickness: '5 мм' },
    sst2: { area: 5,    weightPerM2: 12, thickness: '7 мм' },
    sst3: { area: null, weightPerM2: 19, thickness: '11 мм' },
  },
  wide: {
    sst1: { area: 97.5, weightPerM2: 8,  thickness: '5 мм' },
    sst2: { area: 97.5, weightPerM2: 12, thickness: '7 мм' },
    sst3: { area: 97.5, weightPerM2: 19, thickness: '11 мм' },
  },
  big: {
    sst1: { area: 170, weightPerM2: 8,  thickness: '5 мм' },
    sst2: { area: 125, weightPerM2: 12, thickness: '7 мм' },
    sst3: { area: 80,  weightPerM2: 19, thickness: '11 мм' },
  },
};

const formatLabels: Record<Format, string> = {
  compact: 'Компактные',
  wide: 'Широкие',
  big: 'Большие',
};

const typeLabels: Record<SSTType, string> = {
  sst1: 'ССТ1™ — 5 мм',
  sst2: 'ССТ2™ — 7 мм',
  sst3: 'ССТ3™ — 11 мм',
};

export function Calculator() {
  const [format, setFormat] = useState<Format>('big');
  const [sstType, setSstType] = useState<SSTType>('sst1');
  const [area, setArea] = useState<string>('');

  const spec = data[format][sstType];
  const areaNum = parseFloat(area);
  const isUnavailable = spec.area === null;
  const hasResult = !isUnavailable && !isNaN(areaNum) && areaNum > 0;

  const rollsCount = hasResult ? Math.ceil(areaNum / spec.area!) : null;
  const totalWeightKg = hasResult ? Math.round(areaNum * spec.weightPerM2) : null;
  // Объём бетона 10 см = площадь × 0.1 м³, миксер = 9 м³ → площадь / 90
  const mixersCount = hasResult ? Math.round(areaNum / 90) : null;

  const weightLabel = totalWeightKg
    ? totalWeightKg >= 1000
      ? `${(totalWeightKg / 1000).toFixed(1)} т`
      : `${totalWeightKg} кг`
    : null;

  return (
    <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
      {/* Переключатель формата */}
      <div className="mb-5">
        <div className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Формат рулона</div>
        <div className="flex rounded-2xl border border-border bg-surface p-1 gap-1">
          {(Object.keys(formatLabels) as Format[]).map((f) => (
            <button
              key={f}
              onClick={() => {
                setFormat(f);
                if (f === 'compact' && sstType === 'sst3') setSstType('sst1');
              }}
              className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                format === f
                  ? 'gradient-brand text-brand-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {formatLabels[f]}
            </button>
          ))}
        </div>
      </div>

      {/* Переключатель типа ССТ */}
      <div className="mb-5">
        <div className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Тип полотна</div>
        <div className="flex rounded-2xl border border-border bg-surface p-1 gap-1">
          {(Object.keys(typeLabels) as SSTType[]).map((t) => {
            const disabled = format === 'compact' && t === 'sst3';
            return (
              <button
                key={t}
                onClick={() => !disabled && setSstType(t)}
                disabled={disabled}
                className={`flex-1 rounded-xl px-2 py-2.5 text-xs font-bold transition ${
                  sstType === t && !disabled
                    ? 'gradient-brand text-brand-foreground shadow-sm'
                    : disabled
                    ? 'cursor-not-allowed text-muted-foreground/30'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {typeLabels[t].split(' — ')[0]}
                <span className="ml-1 hidden sm:inline opacity-60">
                  {typeLabels[t].split(' — ')[1]}
                </span>
              </button>
            );
          })}
        </div>
        {format === 'compact' && (
          <p className="mt-1.5 text-xs text-muted-foreground">
            ССТ3™ недоступен в компактных рулонах
          </p>
        )}
      </div>

      {/* Площадь */}
      <div className="mb-5">
        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Площадь покрытия (м²)
        </label>
        <input
          type="number"
          min="1"
          placeholder="Например, 500"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          className="w-full rounded-2xl border border-border bg-background px-5 py-3.5 text-lg font-bold text-foreground placeholder:text-muted-foreground/40 placeholder:font-normal focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition"
        />
      </div>

      {/* Предупреждение */}
      {isUnavailable && (
        <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>ССТ3™ не выпускается в компактных рулонах. Выберите ССТ1™ или ССТ2™, или переключитесь на большие рулоны.</span>
        </div>
      )}

      {/* Пустое состояние */}
      {!hasResult && !isUnavailable && (
        <div className="rounded-2xl border border-dashed border-border bg-surface p-5 text-center text-sm text-muted-foreground">
          Введите площадь — и сразу увидите результат
        </div>
      )}

      {/* Результат */}
      {hasResult && (
        <>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="rounded-2xl border border-border bg-surface p-4">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                <Package className="h-3.5 w-3.5" />
                Рулонов
              </div>
              <div className="font-display text-5xl font-extrabold text-brand leading-none">
                {rollsCount}
              </div>
              <div className="mt-1.5 text-xs text-muted-foreground">
                по {spec.area} м² каждый
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-4">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                <Weight className="h-3.5 w-3.5" />
                Суммарный вес
              </div>
              <div className="font-display text-5xl font-extrabold text-brand leading-none">
                {weightLabel}
              </div>
              <div className="mt-1.5 text-xs text-muted-foreground">
                {spec.weightPerM2} кг/м² × {areaNum} м²
              </div>
            </div>
          </div>

          {/* Сравнение с миксерами */}
          {mixersCount !== null && mixersCount >= 1 && (
            <div className="mb-3 flex items-start gap-3 rounded-2xl border border-border bg-surface px-4 py-3">
              <Truck className="h-5 w-5 shrink-0 text-brand mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">
                  Заменяет <span className="font-bold text-foreground">{mixersCount} миксеров</span> обычного бетона при укладке 10 см покрытия
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground/60">
                  Расчёт: {areaNum} м² × 0,1 м ÷ 9 м³/миксер
                </p>
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="rounded-2xl border border-brand/20 bg-brand-soft p-4 flex items-center justify-between gap-4">
            <p className="text-sm font-semibold text-brand-dark">
              Нужен точный расчёт с доставкой?
            </p>
            <Link
              to="/contacts"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full gradient-brand px-4 py-2 text-xs font-bold text-brand-foreground transition hover:scale-[1.03]"
              style={{ boxShadow: 'var(--shadow-brand)' }}
            >
              Запросить
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
