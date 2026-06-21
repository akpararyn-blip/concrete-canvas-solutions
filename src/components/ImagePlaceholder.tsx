import { Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  label?: string;
  aspect?: string;
  className?: string;
}

export function ImagePlaceholder({ label, aspect = 'aspect-[4/3]', className }: Props) {
  return (
    <div
      className={cn(
        'relative flex items-center justify-center overflow-hidden rounded-2xl border border-border bg-surface-2',
        aspect,
        className,
      )}
    >
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, transparent 0 12px, oklch(0.92 0.01 250) 12px 13px)',
        }}
      />
      <div className="relative z-10 flex flex-col items-center gap-2 text-center text-muted-foreground">
        <ImageIcon className="h-8 w-8 opacity-50" />
        {label && <span className="px-4 text-xs font-medium">{label}</span>}
      </div>
    </div>
  );
}
