// Яндекс Метрика (счётчик в аккаунте mr.frigate) — упомянута в политике cookie.
// Код счётчика вставляется в <head> в __root.tsx; init отправляет первый просмотр,
// переходы внутри SPA шлёт useMetrikaPageviews.
import { useEffect } from 'react';
import { useRouter } from '@tanstack/react-router';

export const METRIKA_ID = 113839871;

/** Стандартный код счётчика из интерфейса Метрики (вкладка SPA). */
export const metrikaScript = `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();
for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${METRIKA_ID}', 'ym');
ym(${METRIKA_ID}, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});`;

type Ym = (id: number, method: string, ...args: unknown[]) => void;

/** Просмотр страницы при каждом клиентском переходе (первый шлёт init). */
export function useMetrikaPageviews() {
  const router = useRouter();
  useEffect(() => {
    return router.subscribe('onResolved', ({ fromLocation, toLocation, pathChanged }) => {
      if (!fromLocation || !pathChanged) return;
      const url = window.location.origin + toLocation.href;
      const referer = window.location.origin + fromLocation.href;
      // после отрисовки: Метрика берёт document.title новой страницы
      setTimeout(() => {
        const ym = (window as unknown as { ym?: Ym }).ym;
        ym?.(METRIKA_ID, 'hit', url, { referer });
      }, 0);
    });
  }, [router]);
}
