export const SITE = {
  company: 'ООО ЗЭМ «Электровибромашина»',
  product: 'Бетонное полотно',
  phonePrimary: '8 (863) 296-36-31',
  phonePrimaryHref: 'tel:+78632963631',
  phoneMobile: '+7 (928) 296-36-31',
  phoneMobileHref: 'tel:+79282963631',
  email: 'zemEVM@inbox.ru',
  emailHref: 'mailto:zemEVM@inbox.ru',
  address:
    '346421, Россия, Ростовская обл., г. Новочеркасск, ул. Буденновская, д. 277, этаж 2, комната 31',
  addressShort: 'г. Новочеркасск, ул. Буденновская, 277',
  workingHours: 'Пн–Пт, 9:00 – 18:00',
  yandexMapSrc:
    'https://yandex.ru/map-widget/v1/?ll=40.106667%2C47.412222&mode=search&text=%D0%9D%D0%BE%D0%B2%D0%BE%D1%87%D0%B5%D1%80%D0%BA%D0%B0%D1%81%D1%81%D0%BA%20%D0%91%D1%83%D0%B4%D0%B5%D0%BD%D0%BD%D0%BE%D0%B2%D1%81%D0%BA%D0%B0%D1%8F%20277&z=16',
  requisites: {
    fullName: 'Общество с ограниченной ответственностью ЗЭМ «Электровибромашина»',
    shortName: 'ООО ЗЭМ «Электровибромашина»',
    inn: '6150099416',
    kpp: '615001001',
    ogrn: '1196196052953',
    okato: '60427000000',
    okogu: '4210014',
    okpo: '42814395',
    okved: '28.91; 28.92; 25.62; 25.93; 28.15.2; 28.41; 28.94.4; 46.69',
    okfs: '16',
    okopf: '12300',
    director: 'Петиев К.С., действующий на основании Устава',
  },
} as const;

export const NAV = [
  { to: '/', label: 'Главная' },
  { to: '/product', label: 'О продукте' },
  { to: '/applications', label: 'Применение' },
  { to: '/delivery', label: 'Формы поставки' },
  { to: '/installation', label: 'Монтаж' },
  { to: '/about', label: 'Компания' },
  { to: '/contacts', label: 'Контакты' },
] as const;
