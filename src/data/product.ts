export const media = {
  case: '/media/projects/12615/ylvcnsYIK.webp',
  pairTilt: '/media/projects/12615/dgahzfYIL.webp',
  frameClose: '/media/projects/12615/asthdcYIM.webp',
  riverBank: '/media/projects/12615/sbazzcYIN.webp',
  logoClose: '/media/projects/12615/dzxhelYIO.webp',
  pairStand: '/media/projects/12615/fwsyvhYIP.webp',
  bindingClose: '/media/projects/12615/tbvojeYIQ.webp',
  promoCase: '/media/projects/12615/pqfzigYIR.webp',
  promoFix: '/media/projects/12615/lsycqnYIS.webp',
  promoEasyFix: '/media/projects/12615/wgdmhbYIT.webp',
  promoLight: '/media/projects/12615/emeiikYIU.webp',
  promoTactic: '/media/projects/12615/azhcslYIV.webp',
  video: '/media/projects/12615/tviqyyYIJ.mp4',
} as const;

export const contacts = {
  phone: '+7 951 904 92 68',
  phoneHref: 'tel:+79519049268',
  email: 'info@pronine.ru',
  company: 'ИП Кожухова Екатерина Игоревна',
  inn: '525633972640',
  ogrn: '321527500019733',
} as const;

export const buyLinks = [
  {
    name: 'Wildberries',
    note: 'Карточка товара',
    url: 'https://www.wildberries.ru/catalog/305404746/detail.aspx',
    primary: true,
  },
  {
    name: 'Ozon',
    note: 'Цена и наличие на площадке',
    url: 'https://www.ozon.ru/product/snegostupy-pronine-taktik-930-dlya-ohoty-i-rybalki-1782275779/',
    primary: false,
  },
  {
    name: 'Яндекс Маркет',
    note: 'Условия доставки на площадке',
    url: 'https://market.yandex.ru/card/snegostupy-pronine-930-blackwhite/103679543514',
    primary: false,
  },
  {
    name: 'DOSKASVESLOM',
    note: 'Специализированный магазин',
    url: 'https://www.doskasveslom.ru/product/zimnij-sport-i-otdyh/snegostupy/snegostupy-pronine-930-black-white/',
    primary: false,
  },
] as const;

export const highlights = [
  {
    value: '165 кг',
    label: 'предел прочности',
    icon: 'lucide:shield-check',
  },
  {
    value: '1200 г',
    label: 'вес одного снегоступа',
    icon: 'lucide:feather',
  },
  {
    value: '−60 °C',
    label: 'заявленная температура',
    icon: 'lucide:snowflake',
  },
  {
    value: '35–49',
    label: 'размер обуви',
    icon: 'lucide:ruler',
  },
] as const;

export const features = [
  {
    icon: 'lucide:feather',
    title: 'Алюминий AL6061',
    text: 'Алюминиевая рама. Вес одного снегоступа — 1200 г, пары — 2,4 кг.',
  },
  {
    icon: 'lucide:shield-check',
    title: 'Предел прочности 165 кг',
    text: 'Рекомендуемый вес пользователя вместе со снаряжением — до 120 кг.',
  },
  {
    icon: 'lucide:snowflake',
    title: 'Морозостойкая площадка',
    text: 'Площадка из морозостойкого пластика. Заявленная рабочая температура — до −60 °C.',
  },
  {
    icon: 'lucide:refresh-cw',
    title: 'Крепление easy fix',
    text: 'Регулируемое крепление под обувь с 35-го по 49-й размер.',
  },
  {
    icon: 'lucide:mountain',
    title: 'Зубцы для сцепления',
    text: 'Заявленная глубина сцепления — 5 см. Зубцы помогают удерживать опору на снегу и насте.',
  },
  {
    icon: 'lucide:briefcase',
    title: 'Чехол в комплекте',
    text: 'Чехол для хранения и переноски входит в комплект снегоступов.',
  },
] as const;

export const specs = [
  { label: 'Модель', value: 'Tactic 930' },
  { label: 'Бренд', value: 'PRONINE ArcticSport' },
  { label: 'Артикул', value: 'PRO9-SNOW-STEP' },
  { label: 'Цвет', value: 'Чёрный / белый' },
  { label: 'Материал рамы', value: 'Алюминий AL6061' },
  { label: 'Материал площадки', value: 'Морозостойкий пластик' },
  { label: 'Вес одного снегоступа', value: '1200 г' },
  { label: 'Предел прочности', value: '165 кг' },
  { label: 'Рекомендуемый вес со снаряжением', value: 'до 120 кг' },
  { label: 'Размер обуви', value: '35–49' },
  { label: 'Глубина сцепления', value: '5 см' },
  { label: 'Длина', value: '76,4 см (30 дюймов)' },
  { label: 'Ширина', value: '23,5 см (9 дюймов)' },
  { label: 'Заявленная рабочая температура', value: 'до −60 °C' },
  { label: 'Гарантия', value: '12 месяцев' },
] as const;

export const faq = [
  {
    q: 'Подойдут ли снегоступы под мой размер обуви?',
    a: 'Крепление регулируется под обувь с 35-го по 49-й размер. Если сомневаетесь в совместимости с конкретными ботинками, напишите нам.',
  },
  {
    q: 'На какую нагрузку рассчитаны снегоступы?',
    a: 'Предел прочности — 165 кг. Рекомендуемый вес пользователя вместе со снаряжением — до 120 кг.',
  },
  {
    q: 'Как снегоступы держат на укатанном снегу?',
    a: 'Зубцы помогают сцеплению со снегом и настом. Заявленная глубина сцепления — 5 см. На льду и склонах сцепление зависит от состояния поверхности.',
  },
  {
    q: 'Сколько весит комплект?',
    a: 'Один снегоступ весит 1200 г, пара — 2,4 кг. Чехол для хранения и переноски входит в комплект.',
  },
  {
    q: 'Работают ли они в сильный мороз?',
    a: 'Заявленная рабочая температура — до −60 °C. Площадка изготовлена из морозостойкого пластика.',
  },
  {
    q: 'Где купить и какая гарантия?',
    a: 'Ссылки на Wildberries, Ozon, Яндекс Маркет и магазин DOSKASVESLOM находятся в разделе «Где купить». Заявленная гарантия — 12 месяцев; условия уточняйте у продавца.',
  },
] as const;