import type { SneakerSeed } from './sneakers.mock'

export const SNEAKER_SEEDS: SneakerSeed[] = [
  {
    brand: 'Nike',
    title: "Blazer Mid '77 Suede",
    category: 'lifestyle',
    gender: 'unisex',
    price: 12999,
    colorway: 'зелёный / белый',
    colors: ['#2f6b3a', '#f4f2ec', '#d9d4c7'],
    images: ['sneakers/sneakers-1.jpg'],
    description:
      'Замшевый верх, высокий силуэт и вулканизированная подошва — модель, которая почти не изменилась с семидесятых и до сих пор собирается по той же колодке.',
    releaseYear: 2021,
    materials: { upper: 'Замша', sole: 'Вулканизированная резина' }
  },
  {
    brand: 'Nike',
    title: 'Air Max 270',
    category: 'running',
    gender: 'unisex',
    price: 15600,
    oldPrice: 17990,
    colorway: 'белый / чёрный / оранжевый',
    colors: ['#f2f2f2', '#1b1b1b', '#f29a2e', '#3aa7b8'],
    images: ['sneakers/sneakers-2.jpg'],
    description:
      'Самая высокая воздушная камера в линейке Air Max: 32 мм в пятке, полностью видимая сбоку. Верх из сетки, бесшовная посадка.',
    releaseYear: 2018
  },
  {
    brand: 'Nike',
    title: "Blazer Mid '77 Vintage",
    category: 'lifestyle',
    gender: 'unisex',
    price: 8499,
    colorway: 'парусина / чёрный',
    colors: ['#eee6da', '#111111', '#f7f3ea'],
    images: ['sneakers/sneakers-3.jpg'],
    description:
      'Светлая расцветка на кремовой коже с контрастным свушем. Классический баскетбольный крой, который давно переехал в повседневную носку.',
    releaseYear: 2020
  },
  {
    brand: 'Puma',
    title: 'Future Rider x Aka Boku',
    category: 'lifestyle',
    gender: 'unisex',
    price: 8999,
    oldPrice: 11990,
    colorway: 'фиолетовый / розовый / жёлтый',
    colors: ['#5b4fa0', '#f0a3c0', '#f4c531', '#1fb0a8'],
    images: ['sneakers/sneakers-4.jpg'],
    description:
      'Беговой силуэт восьмидесятых в коллаборации с японским художником Aka Boku: сетка, замша и персонажи на язычке.',
    releaseYear: 2021
  },
  {
    brand: 'Under Armour',
    title: 'Curry 8',
    category: 'basketball',
    gender: 'men',
    price: 15199,
    colorway: 'жёлтый / белый',
    colors: ['#f4c31c', '#ffffff', '#e0a800'],
    images: ['sneakers/sneakers-5.jpg'],
    description:
      'Подошва UA Flow без резиновой подмётки: пена держит паркет сама и весит меньше. Сделаны под быстрые остановки и шаг назад на трёхочковый.',
    releaseYear: 2021
  },
  {
    brand: 'Nike',
    title: 'Kyrie 7',
    category: 'basketball',
    gender: 'men',
    price: 11299,
    colorway: 'чёрный / белый',
    colors: ['#141414', '#f2f2f2', '#c9a14a'],
    images: ['sneakers/sneakers-6.jpg'],
    description:
      'Круглая пяточная зона и агрессивный протектор под резкие смены направления — модель собрана вокруг манеры игры Кайри Ирвинга.',
    releaseYear: 2020
  },
  {
    brand: 'Jordan',
    title: 'Air Jordan 11 CMFT Low',
    category: 'basketball',
    gender: 'men',
    price: 10799,
    colorway: 'чёрный / красный',
    colors: ['#141414', '#c8202f', '#f2f2f2'],
    images: ['sneakers/sneakers-7.jpg'],
    description:
      'Лакированная кожа по кругу и красная подошва — отсылка к одиннадцатым Jordan, но в мягком низком варианте на каждый день.',
    releaseYear: 2021
  },
  {
    brand: 'Nike',
    title: 'LeBron XVIII',
    category: 'basketball',
    gender: 'men',
    price: 16499,
    colorway: 'чёрный / голубой',
    colors: ['#141414', '#5ab8e0', '#2a3f9e', '#e9b93d'],
    images: ['sneakers/sneakers-8.jpg'],
    description:
      'Связка Air Max в пятке и Zoom Air в носке под вес и скорость Леброна. Трикотажный верх тянется только там, где нужно.',
    releaseYear: 2020
  },
  {
    brand: 'Nike',
    title: 'LeBron XVIII Low',
    category: 'basketball',
    gender: 'men',
    price: 13999,
    colorway: 'салатовый / бирюзовый / коралл',
    colors: ['#dfe7a1', '#1f9f8a', '#f07a5a'],
    images: ['sneakers/sneakers-9.jpg'],
    description:
      'Низкая версия восемнадцатой модели: тот же амортизационный пакет, но легче на сто граммов и свободнее в голеностопе.',
    releaseYear: 2021
  },
  {
    brand: 'Nike',
    title: 'Kyrie 7 Volt',
    category: 'basketball',
    gender: 'men',
    price: 9599,
    oldPrice: 11299,
    colorway: 'салатовый',
    colors: ['#d7f22d', '#b6d418', '#f2f2f2'],
    images: ['sneakers/sneakers-10.jpg'],
    description:
      'Та же седьмая модель Kyrie в кислотной расцветке: видно с другого конца площадки, а протектор держит так же цепко.',
    releaseYear: 2021
  },
  {
    brand: 'Reebok',
    title: 'Club C 85',
    category: 'court',
    gender: 'unisex',
    price: 8899,
    colorway: 'тёмно-синий / гам',
    colors: ['#232a3d', '#b87a3f', '#f2f2f2'],
    images: ['sneakers/sneakers-11.jpg'],
    description:
      'Теннисный кроссовок 1985 года: гладкая кожа, короткий язычок и коричневая «гамовая» подошва, которая делает его чуть винтажнее белых собратьев.',
    releaseYear: 2022
  },
  {
    brand: 'Converse',
    title: 'Chuck Taylor All Star Hi',
    category: 'skate',
    gender: 'unisex',
    price: 6999,
    colorway: 'белый',
    colors: ['#f7f7f5', '#1b2a5c', '#c8202f'],
    images: ['sneakers/sneakers-12.jpg'],
    description:
      'Канвас, резиновый мысок и нашивка со звездой на щиколотке. Силуэт почти столетней давности, который до сих пор носят все — от скейтеров до музыкантов.',
    releaseYear: 2019
  },
  {
    brand: 'Nike',
    title: 'Dunk Low Retro',
    category: 'lifestyle',
    gender: 'unisex',
    price: 13990,
    colorway: 'белый / синий / оранжевый',
    colors: ['#f4f4f2', '#2f4fd0', '#f07a2a'],
    images: [
      'sneakers/u/nike-dunk-low-white-blue-orange-1.webp',
      'sneakers/u/nike-dunk-low-white-blue-orange-2.webp',
      'sneakers/u/nike-dunk-low-white-blue-orange-3.webp',
      'sneakers/u/nike-dunk-low-white-blue-orange-4.webp'
    ],
    description:
      'Баскетбольная модель 1985 года, которая стала главным скейт- и лайфстайл-силуэтом десятилетия. Кожаный верх в три цвета и плоская подошва.',
    releaseYear: 2024
  },
  {
    brand: 'Jordan',
    title: 'Air Jordan 1 Low',
    category: 'basketball',
    gender: 'women',
    price: 14490,
    colorway: 'белый / фиолетовый',
    colors: ['#f4f2f4', '#5b3a8c', '#c9b5e0'],
    images: [
      'sneakers/u/jordan-1-low-white-purple-1.webp',
      'sneakers/u/jordan-1-low-white-purple-2.webp'
    ],
    description:
      'Низкие первые Jordan в сиреневой расцветке: кожа, Air-вставка в пятке и тот же силуэт, что в 1985-м.',
    releaseYear: 2025,
    isNew: true
  },
  {
    brand: 'New Balance',
    title: '550',
    category: 'lifestyle',
    gender: 'women',
    price: 13490,
    colorway: 'белый / розовый / синий',
    colors: ['#f5f2ee', '#e79cb5', '#2b3f8f'],
    images: [
      'sneakers/u/new-balance-550-white-pink-1.webp',
      'sneakers/u/new-balance-550-white-pink-2.webp',
      'sneakers/u/new-balance-550-white-pink-3.webp',
      'sneakers/u/new-balance-550-white-pink-4.webp'
    ],
    description:
      'Баскетбольная модель восьмидесятых, которую New Balance вернули в 2020-м. Толстая чашка подошвы и перфорированный мысок.',
    releaseYear: 2025,
    isNew: true
  },
  {
    brand: 'adidas',
    title: 'Forum Mid',
    category: 'basketball',
    gender: 'unisex',
    price: 12990,
    oldPrice: 15990,
    colorway: 'белый / синий',
    colors: ['#f4f4f2', '#1f4fbf', '#dfe4ee'],
    images: [
      'sneakers/u/adidas-forum-mid-white-blue-1.webp',
      'sneakers/u/adidas-forum-mid-white-blue-2.webp',
      'sneakers/u/adidas-forum-mid-white-blue-3.webp'
    ],
    description:
      'Средняя высота и ремешок на липучке вокруг щиколотки — баскетбольный архив adidas 1984 года.',
    releaseYear: 2023
  },
  {
    brand: 'adidas',
    title: 'Duramo SL',
    category: 'running',
    gender: 'unisex',
    price: 8990,
    colorway: 'белый / бирюзовый',
    colors: ['#f2f4f4', '#1fa39a', '#9aa0a6'],
    images: [
      'sneakers/u/adidas-running-white-teal-1.webp',
      'sneakers/u/adidas-running-white-teal-2.webp',
      'sneakers/u/adidas-running-white-teal-3.webp'
    ],
    description:
      'Лёгкие беговые на каждый день: мягкая пена Lightmotion и сетчатый верх. Для темпа до 10 километров.',
    releaseYear: 2025
  },
  {
    brand: 'Nike',
    title: 'Dunk Low Premium',
    category: 'lifestyle',
    gender: 'men',
    price: 15490,
    colorway: 'чёрный / белый / серебристый',
    colors: ['#151515', '#c9ccd0', '#f2f2f2'],
    images: [
      'sneakers/u/nike-dunk-low-black-silver-1.webp',
      'sneakers/u/nike-dunk-low-black-silver-2.webp',
      'sneakers/u/nike-dunk-low-black-silver-3.webp'
    ],
    description:
      'Чёрная кожа и металлический свуш: самая строгая версия Dunk, которая выглядит одинаково уместно с джинсами и брюками.',
    releaseYear: 2024
  },
  {
    brand: 'Jordan',
    title: 'Air Jordan 1 Low «Black Toe»',
    category: 'basketball',
    gender: 'men',
    price: 15990,
    colorway: 'белый / чёрный / красный',
    colors: ['#f2f2f2', '#141414', '#c8202f'],
    images: [
      'sneakers/u/jordan-1-low-black-toe-1.webp',
      'sneakers/u/jordan-1-low-black-toe-2.webp'
    ],
    description:
      'Расцветка Black Toe: белый верх, чёрный мысок и красная пятка — одна из трёх исходных схем 1985 года.',
    releaseYear: 2024
  },
  {
    brand: 'Asics',
    title: 'GEL-Excite 10',
    category: 'running',
    gender: 'men',
    price: 8490,
    oldPrice: 9990,
    colorway: 'тёмно-синий / салатовый',
    colors: ['#1d2a4a', '#c8e04a', '#f2f2f2'],
    images: [
      'sneakers/u/asics-gel-navy-lime-1.webp',
      'sneakers/u/asics-gel-navy-lime-2.webp',
      'sneakers/u/asics-gel-navy-lime-3.webp',
      'sneakers/u/asics-gel-navy-lime-4.webp'
    ],
    description:
      'Беговые начального уровня с гелевыми вставками в пятке. Широкая колодка, подойдут на полную стопу.',
    releaseYear: 2024
  },
  {
    brand: 'Puma',
    title: 'Velocity Nitro 3',
    category: 'running',
    gender: 'unisex',
    price: 12490,
    colorway: 'чёрный / белый',
    colors: ['#141414', '#f2f2f2', '#6b6b6b'],
    images: ['sneakers/u/puma-running-black-1.webp'],
    description:
      'Азотная пена Nitro пружинит и не проседает к концу длинной пробежки. Протектор PumaGrip держит мокрый асфальт.',
    releaseYear: 2025,
    isNew: true
  },
  {
    brand: 'Пара Studio',
    title: 'Hoop Mid',
    category: 'basketball',
    gender: 'men',
    price: 7990,
    colorway: 'чёрный / красный',
    colors: ['#141414', '#c8202f', '#8a8a8a'],
    images: ['sneakers/u/basketball-black-red-1.webp', 'sneakers/u/basketball-black-red-2.webp'],
    description:
      'Собственная линейка магазина: баскетбольный силуэт средней высоты с плотным голенищем и подошвой-ёлочкой под паркет.',
    releaseYear: 2025,
    isNew: true
  },
  {
    brand: 'Jordan',
    title: 'Travis Scott x Air Jordan 1 Low OG «Olive»',
    category: 'basketball',
    gender: 'unisex',
    price: 89990,
    colorway: 'белый / чёрный / оливковый',
    colors: ['#f2efe6', '#141414', '#6b6b3a'],
    images: [
      'sneakers/u/jordan-1-low-travis-olive-1.webp',
      'sneakers/u/jordan-1-low-travis-olive-2.webp',
      'sneakers/u/jordan-1-low-travis-olive-3.webp',
      'sneakers/u/jordan-1-low-travis-olive-4.webp'
    ],
    description:
      'Перевёрнутый свуш, оливковые вставки и сэйл-подошва. Коллаборация, которую почти невозможно купить по ритейл-цене.',
    releaseYear: 2023
  },
  {
    brand: 'Nike',
    title: 'Dunk Low «Sage»',
    category: 'lifestyle',
    gender: 'women',
    price: 13490,
    colorway: 'светло-зелёный / белый',
    colors: ['#c7d3b5', '#f4f2ec', '#9fb08c'],
    images: [
      'sneakers/u/nike-dunk-low-sage-1.webp',
      'sneakers/u/nike-dunk-low-sage-2.webp',
      'sneakers/u/nike-dunk-low-sage-3.webp'
    ],
    description:
      'Приглушённый шалфейный цвет на гладкой коже. Спокойная расцветка, которая идёт почти к любой одежде.',
    releaseYear: 2025,
    isNew: true
  },
  {
    brand: 'adidas',
    title: 'Gazelle Bold',
    category: 'lifestyle',
    gender: 'women',
    price: 12490,
    colorway: 'кремовый / зелёный',
    colors: ['#efe6d2', '#1f5b3a', '#b88a4a'],
    images: [
      'sneakers/u/adidas-gazelle-bold-cream-green-1.webp',
      'sneakers/u/adidas-gazelle-bold-cream-green-2.webp',
      'sneakers/u/adidas-gazelle-bold-cream-green-3.webp'
    ],
    description:
      'Gazelle на тройной платформе: замшевый верх, зелёные полоски и подошва из светлой резины.',
    releaseYear: 2025,
    isNew: true
  },
  {
    brand: 'Jordan',
    title: 'Off-White x Air Jordan 5 «Sail»',
    category: 'basketball',
    gender: 'unisex',
    price: 64990,
    colorway: 'бежевый / чёрный / жёлтый',
    colors: ['#e9dfc8', '#141414', '#e8b92a'],
    images: ['sneakers/u/jordan-5-sail-1.webp', 'sneakers/u/jordan-5-sail-2.webp'],
    description:
      'Прозрачные сетчатые вставки, надписи Off-White и жёлтая подошва. Пятые Jordan в прочтении Вирджила Абло.',
    releaseYear: 2020
  },
  {
    brand: 'Puma',
    title: 'Smash v2',
    category: 'court',
    gender: 'unisex',
    price: 5990,
    oldPrice: 7490,
    colorway: 'белый',
    colors: ['#f7f7f5', '#d9d9d6', '#141414'],
    images: [
      'sneakers/u/puma-court-white-1.webp',
      'sneakers/u/puma-court-white-2.webp',
      'sneakers/u/puma-court-white-3.webp',
      'sneakers/u/puma-court-white-4.webp'
    ],
    description:
      'Минималистичный теннисный силуэт из гладкой кожи. Белые кроссовки на каждый день, без логотипов на полсапога.',
    releaseYear: 2022
  },
  {
    brand: 'Skechers',
    title: 'GOrun Consistent',
    category: 'running',
    gender: 'men',
    price: 6990,
    colorway: 'тёмно-синий / оранжевый',
    colors: ['#1d2d5a', '#f07a2a', '#f2f2f2'],
    images: [
      'sneakers/u/skechers-navy-orange-1.webp',
      'sneakers/u/skechers-navy-orange-2.webp',
      'sneakers/u/skechers-navy-orange-3.webp'
    ],
    description:
      'Мягкие беговые для прогулок и лёгких пробежек: широкая колодка, пена Ultra Go и петля на пятке.',
    releaseYear: 2023
  },
  {
    brand: 'Nike',
    title: 'Air Max 1',
    category: 'running',
    gender: 'unisex',
    price: 15990,
    colorway: 'белый / оранжевый',
    colors: ['#f4f4f2', '#f07a3a', '#c9ccd0'],
    images: [
      'sneakers/u/nike-air-max-1-white-orange-1.webp',
      'sneakers/u/nike-air-max-1-white-orange-2.webp',
      'sneakers/u/nike-air-max-1-white-orange-3.webp'
    ],
    description:
      'Та самая модель 1987 года, в которой Nike впервые показали воздушную подушку через окно в подошве.',
    releaseYear: 2024
  },
  {
    brand: 'Jordan',
    title: 'Air Jordan 1 Low «Gym Red»',
    category: 'basketball',
    gender: 'unisex',
    price: 14990,
    colorway: 'белый / красный / чёрный',
    colors: ['#f2f2f2', '#c8202f', '#141414'],
    images: [
      'sneakers/u/jordan-1-low-gym-red-1.webp',
      'sneakers/u/jordan-1-low-gym-red-2.webp',
      'sneakers/u/jordan-1-low-gym-red-3.webp',
      'sneakers/u/jordan-1-low-gym-red-4.webp'
    ],
    description:
      'Красный на белом — самая узнаваемая схема Jordan. Низкий крой, кожа и Air в пятке.',
    releaseYear: 2024
  },
  {
    brand: 'Nike',
    title: "Air Force 1 '07",
    category: 'lifestyle',
    gender: 'unisex',
    price: 12990,
    colorway: 'белый',
    colors: ['#f7f7f5', '#e2e2df', '#c9ccd0'],
    images: [
      'sneakers/u/nike-air-force-1-white-1.webp',
      'sneakers/u/nike-air-force-1-white-2.webp',
      'sneakers/u/nike-air-force-1-white-3.webp',
      'sneakers/u/nike-air-force-1-white-4.webp'
    ],
    description:
      'Белые Air Force — кроссовки, которые не выходят из моды с 1982 года. Кожа, толстая подошва и воздушная капсула внутри.',
    releaseYear: 2024
  },
  {
    brand: 'Nike',
    title: 'SB Dunk Low Pro',
    category: 'skate',
    gender: 'unisex',
    price: 14490,
    colorway: 'светло-бирюзовый / оранжевый',
    colors: ['#a8d6d6', '#f07a2a', '#f2e6c8'],
    images: [
      'sneakers/u/nike-sb-dunk-orange-teal-1.webp',
      'sneakers/u/nike-sb-dunk-orange-teal-2.webp',
      'sneakers/u/nike-sb-dunk-orange-teal-3.webp',
      'sneakers/u/nike-sb-dunk-orange-teal-4.webp'
    ],
    description:
      'Скейтовая версия Dunk: язычок с набивкой, стелька Zoom Air и подошва, которая держит доску.',
    releaseYear: 2024
  },
  {
    brand: 'Asics',
    title: 'GEL-Saga',
    category: 'lifestyle',
    gender: 'women',
    price: 10990,
    colorway: 'белый / голубой / розовый',
    colors: ['#f2f2f2', '#6ec3d4', '#f0a3c0'],
    images: [
      'sneakers/u/asics-gel-saga-white-teal-pink-1.webp',
      'sneakers/u/asics-gel-saga-white-teal-pink-2.webp',
      'sneakers/u/asics-gel-saga-white-teal-pink-3.webp'
    ],
    description:
      'Беговой архив Asics 1991 года в пастельной расцветке: сетка, замша и гелевая вставка в пятке.',
    releaseYear: 2024
  },
  {
    brand: 'Asics',
    title: 'Japan S',
    category: 'court',
    gender: 'unisex',
    price: 8490,
    colorway: 'белый / тёмно-синий',
    colors: ['#f4f4f2', '#1d2a4a', '#c9ccd0'],
    images: [
      'sneakers/u/asics-japan-s-white-navy-1.webp',
      'sneakers/u/asics-japan-s-white-navy-2.webp',
      'sneakers/u/asics-japan-s-white-navy-3.webp'
    ],
    description:
      'Баскетбольный силуэт восьмидесятых в городском исполнении: кожа, тигриные полосы и тонкая подошва.',
    releaseYear: 2023
  },
  {
    brand: 'Puma',
    title: 'Cali',
    category: 'lifestyle',
    gender: 'women',
    price: 8990,
    oldPrice: 11490,
    colorway: 'белый / розовый',
    colors: ['#f7f4f2', '#f2b6c4', '#7a1f2e'],
    images: ['sneakers/u/puma-cali-white-pink-1.webp', 'sneakers/u/puma-cali-white-pink-2.webp'],
    description:
      'Кожаные на платформе, вдохновлённые теннисной классикой и калифорнийским солнцем.',
    releaseYear: 2023
  },
  {
    brand: 'Puma',
    title: 'RS-X Soft',
    category: 'lifestyle',
    gender: 'women',
    price: 10490,
    colorway: 'розовый / мятный / жёлтый',
    colors: ['#f2b6c4', '#a8e0cc', '#f4d35e'],
    images: [
      'sneakers/u/puma-pastel-mint-pink-1.webp',
      'sneakers/u/puma-pastel-mint-pink-2.webp',
      'sneakers/u/puma-pastel-mint-pink-3.webp'
    ],
    description:
      'Объёмный ретро-раннер с амортизацией Running System: пастельная сетка, замша и массивная подошва.',
    releaseYear: 2024
  },
  {
    brand: 'New Balance',
    title: 'Fresh Foam X More v4',
    category: 'running',
    gender: 'men',
    price: 16990,
    colorway: 'тёмно-синий / салатовый / белый',
    colors: ['#1d2a4a', '#c8e04a', '#f2f2f2'],
    images: [
      'sneakers/u/new-balance-fresh-foam-more-navy-1.webp',
      'sneakers/u/new-balance-fresh-foam-more-navy-2.webp',
      'sneakers/u/new-balance-fresh-foam-more-navy-3.webp'
    ],
    description:
      'Максимум пены Fresh Foam X под стопой: для длинных спокойных пробежек и восстановительных тренировок.',
    releaseYear: 2024
  },
  {
    brand: 'New Balance',
    title: 'Fresh Foam Roav',
    category: 'running',
    gender: 'men',
    price: 9490,
    oldPrice: 11990,
    colorway: 'чёрный / оранжевый',
    colors: ['#141414', '#f07a2a', '#6b6b6b'],
    images: [
      'sneakers/u/new-balance-fresh-foam-roav-black-orange-1.webp',
      'sneakers/u/new-balance-fresh-foam-roav-black-orange-2.webp',
      'sneakers/u/new-balance-fresh-foam-roav-black-orange-3.webp',
      'sneakers/u/new-balance-fresh-foam-roav-black-orange-4.webp'
    ],
    description:
      'Носочный верх и мягкая пена: беговые, которые чаще носят в городе, чем на стадионе.',
    releaseYear: 2022
  },
  {
    brand: 'Nike',
    title: 'sacai x LDWaffle',
    category: 'running',
    gender: 'unisex',
    price: 39990,
    colorway: 'синий / красный / жёлтый',
    colors: ['#2f4fd0', '#c8202f', '#f4c531', '#5b8c3a'],
    images: [
      'sneakers/u/nike-sacai-ldwaffle-1.webp',
      'sneakers/u/nike-sacai-ldwaffle-2.webp',
      'sneakers/u/nike-sacai-ldwaffle-3.webp',
      'sneakers/u/nike-sacai-ldwaffle-4.webp'
    ],
    description:
      'Две модели в одной: сдвоенные язычки, двойные свуши и подошва Waffle. Коллаборация с японским брендом sacai.',
    releaseYear: 2019
  },
  {
    brand: 'adidas',
    title: 'Samba OG',
    category: 'lifestyle',
    gender: 'unisex',
    price: 12990,
    colorway: 'белый / зелёный',
    colors: ['#f4f4f2', '#1f5b3a', '#b88a4a'],
    images: [
      'sneakers/u/adidas-samba-white-green-1.webp',
      'sneakers/u/adidas-samba-white-green-2.webp',
      'sneakers/u/adidas-samba-white-green-3.webp'
    ],
    description:
      'Футбольная бутса для зала 1950 года, которая стала главной уличной моделью двадцатых: кожа, замшевый мысок и гамовая подошва.',
    releaseYear: 2025,
    isNew: true
  },
  {
    brand: 'adidas',
    title: 'Samba OG «Gold»',
    category: 'lifestyle',
    gender: 'women',
    price: 13490,
    colorway: 'белый / золотой',
    colors: ['#f4f2ec', '#c9a14a', '#b88a4a'],
    images: [
      'sneakers/u/adidas-samba-white-gold-1.webp',
      'sneakers/u/adidas-samba-white-gold-2.webp',
      'sneakers/u/adidas-samba-white-gold-3.webp'
    ],
    description: 'Та же Samba с золотыми полосками и тиснением на пятке — чуть наряднее классики.',
    releaseYear: 2025,
    isNew: true
  },
  {
    brand: 'Lacoste',
    title: 'Carnaby Pro',
    category: 'court',
    gender: 'unisex',
    price: 10990,
    oldPrice: 13990,
    colorway: 'белый / зелёный',
    colors: ['#f7f7f5', '#1f5b3a', '#c9ccd0'],
    images: [
      'sneakers/u/lacoste-white-green-1.webp',
      'sneakers/u/lacoste-white-green-2.webp',
      'sneakers/u/lacoste-white-green-3.webp',
      'sneakers/u/lacoste-white-green-4.webp'
    ],
    description: 'Теннисный силуэт из гладкой кожи с зелёной пяткой и крокодилом на боку.',
    releaseYear: 2023
  },
  {
    brand: 'adidas',
    title: 'Yeezy Boost 350 V2',
    category: 'lifestyle',
    gender: 'unisex',
    price: 27990,
    colorway: 'чёрный / белый',
    colors: ['#1b1b1b', '#f2f2f2', '#6b6b6b'],
    images: [
      'sneakers/u/adidas-yeezy-350-black-white-1.webp',
      'sneakers/u/adidas-yeezy-350-black-white-2.webp'
    ],
    description:
      'Трикотажный верх Primeknit, полоска с надписью по боку и пена Boost по всей длине подошвы.',
    releaseYear: 2022
  },
  {
    brand: 'Nike',
    title: 'Air Max 95',
    category: 'running',
    gender: 'men',
    price: 17990,
    colorway: 'тёмно-синий / белый / жёлтый',
    colors: ['#1d2d5a', '#f2f2f2', '#f4c531'],
    images: [
      'sneakers/u/nike-air-max-95-navy-1.webp',
      'sneakers/u/nike-air-max-95-navy-2.webp',
      'sneakers/u/nike-air-max-95-navy-3.webp',
      'sneakers/u/nike-air-max-95-navy-4.webp'
    ],
    description:
      'Слоистый верх по мотивам анатомии человека и видимые капсулы Air в пятке и мыске. Дизайн Серджио Лосано.',
    releaseYear: 2024
  },
  {
    brand: 'Jordan',
    title: 'Air Jordan 1 High OG «Starfish»',
    category: 'basketball',
    gender: 'unisex',
    price: 19990,
    colorway: 'белый / оранжевый / чёрный',
    colors: ['#f4f2ec', '#e8782a', '#141414'],
    images: [
      'sneakers/u/jordan-1-high-starfish-1.webp',
      'sneakers/u/jordan-1-high-starfish-2.webp',
      'sneakers/u/jordan-1-high-starfish-3.webp'
    ],
    description:
      'Высокие OG в оранжевом «морская звезда»: кожа, состаренная подошва и крылатый логотип на щиколотке.',
    releaseYear: 2024
  },
  {
    brand: 'Jordan',
    title: 'Air Jordan 1 Mid «Shadow»',
    category: 'basketball',
    gender: 'men',
    price: 14990,
    oldPrice: 17490,
    colorway: 'чёрный / серый / красный',
    colors: ['#141414', '#6b6b6b', '#c8202f'],
    images: [
      'sneakers/u/jordan-1-mid-shadow-1.webp',
      'sneakers/u/jordan-1-mid-shadow-2.webp',
      'sneakers/u/jordan-1-mid-shadow-3.webp'
    ],
    description: 'Чёрная и серая кожа с красным акцентом: самая тихая из расцветок первых Jordan.',
    releaseYear: 2023
  },
  {
    brand: 'Jordan',
    title: 'Air Jordan 4 «Military Black»',
    category: 'basketball',
    gender: 'unisex',
    price: 27990,
    colorway: 'белый / серый / чёрный',
    colors: ['#f2f2f2', '#9a9ca0', '#141414'],
    images: [
      'sneakers/u/jordan-4-military-black-1.webp',
      'sneakers/u/jordan-4-military-black-2.webp'
    ],
    description:
      'Четвёртые Jordan с сетчатыми вставками и пластиковыми «крыльями» шнуровки. Серый и чёрный на белой коже.',
    releaseYear: 2022
  },
  {
    brand: 'Пара Studio',
    title: 'Knit Slip-On',
    category: 'lifestyle',
    gender: 'unisex',
    price: 5490,
    colorway: 'оливковый / белый',
    colors: ['#6b6b3a', '#f2f2f2', '#9aa06b'],
    images: [
      'sneakers/u/knit-slip-on-olive-1.webp',
      'sneakers/u/knit-slip-on-olive-2.webp',
      'sneakers/u/knit-slip-on-olive-3.webp',
      'sneakers/u/knit-slip-on-olive-4.webp'
    ],
    description:
      'Собственная линейка магазина: слипоны из дышащего трикотажа на мягкой пене. Надел и пошёл — шнурки не нужны.',
    releaseYear: 2025,
    isNew: true
  },
  {
    brand: 'Saucony',
    title: 'Triumph 21',
    category: 'running',
    gender: 'men',
    price: 15490,
    colorway: 'серый / голубой / оранжевый',
    colors: ['#9aa0a6', '#2f8fd0', '#f07a2a'],
    images: [
      'sneakers/u/saucony-triumph-grey-blue-1.webp',
      'sneakers/u/saucony-triumph-grey-blue-2.webp',
      'sneakers/u/saucony-triumph-grey-blue-3.webp',
      'sneakers/u/saucony-triumph-grey-blue-4.webp'
    ],
    description:
      'Флагманская амортизация Saucony: пена PWRRUN+ и широкая платформа для длинных дистанций.',
    releaseYear: 2023
  },
  {
    brand: 'Nike',
    title: 'Air Max 90',
    category: 'lifestyle',
    gender: 'unisex',
    price: 14990,
    colorway: 'белый / оранжевый / чёрный',
    colors: ['#f4f4f2', '#f4a52a', '#141414'],
    images: [
      'sneakers/u/nike-air-max-90-white-orange-1.webp',
      'sneakers/u/nike-air-max-90-white-orange-2.webp',
      'sneakers/u/nike-air-max-90-white-orange-3.webp',
      'sneakers/u/nike-air-max-90-white-orange-4.webp'
    ],
    description: 'Air Max 1990 года с вафельной подошвой и пластиковыми вставками вокруг шнуровки.',
    releaseYear: 2024
  },
  {
    brand: 'New Balance',
    title: '574',
    category: 'lifestyle',
    gender: 'unisex',
    price: 10990,
    colorway: 'серый / белый / бирюзовый',
    colors: ['#9aa0a6', '#f2f2f2', '#3aa7b8'],
    images: [
      'sneakers/u/new-balance-574-grey-1.webp',
      'sneakers/u/new-balance-574-grey-2.webp',
      'sneakers/u/new-balance-574-grey-3.webp'
    ],
    description: 'Замша и сетка на подошве ENCAP — самые продаваемые New Balance с 1988 года.',
    releaseYear: 2023
  },
  {
    brand: 'Tommy Hilfiger',
    title: 'Sock Runner',
    category: 'lifestyle',
    gender: 'men',
    price: 11990,
    oldPrice: 14990,
    colorway: 'тёмно-синий / красный / белый',
    colors: ['#1d2d5a', '#c8202f', '#f2f2f2'],
    images: [
      'sneakers/u/tommy-hilfiger-navy-red-1.webp',
      'sneakers/u/tommy-hilfiger-navy-red-2.webp',
      'sneakers/u/tommy-hilfiger-navy-red-3.webp',
      'sneakers/u/tommy-hilfiger-navy-red-4.webp'
    ],
    description:
      'Трикотажный носок вместо язычка и лёгкая подошва. Логотип в трёх фирменных цветах на пятке.',
    releaseYear: 2023
  },
  {
    brand: 'Nike',
    title: "Blazer Mid '77 Suede «Brown»",
    category: 'skate',
    gender: 'unisex',
    price: 10990,
    colorway: 'коричневый / чёрный / белый',
    colors: ['#7a4a2a', '#141414', '#f2f2f2'],
    images: [
      'sneakers/u/nike-blazer-mid-brown-1.webp',
      'sneakers/u/nike-blazer-mid-brown-2.webp',
      'sneakers/u/nike-blazer-mid-brown-3.webp'
    ],
    description: 'Коричневая замша и чёрный свуш на классическом высоком Blazer.',
    releaseYear: 2024
  },
  {
    brand: 'New Balance',
    title: 'CT302',
    category: 'court',
    gender: 'women',
    price: 11490,
    colorway: 'белый / красный',
    colors: ['#f4f2ee', '#c8202f', '#e8d5c8'],
    images: ['sneakers/u/new-balance-ct302-1.webp'],
    description:
      'Теннисный силуэт с утолщённой подошвой и крупной буквой N — ретро с современным силуэтом.',
    releaseYear: 2025,
    isNew: true
  },
  {
    brand: 'Converse',
    title: 'Run Star Hike Hi',
    category: 'lifestyle',
    gender: 'unisex',
    price: 11990,
    colorway: 'чёрный / белый',
    colors: ['#141414', '#f2f2f2', '#e2d8c3'],
    images: [
      'sneakers/u/converse-run-star-hike-black-1.webp',
      'sneakers/u/converse-run-star-hike-black-2.webp',
      'sneakers/u/converse-run-star-hike-black-3.webp'
    ],
    description:
      'Верх Chuck Taylor на зубчатой платформе. Канвас, резиновый мысок и подошва, которая добавляет 4 сантиметра.',
    releaseYear: 2024
  },
  {
    brand: 'On',
    title: 'Cloud 5',
    category: 'running',
    gender: 'unisex',
    price: 16990,
    colorway: 'оливковый / серый',
    colors: ['#5b6b4a', '#9aa0a6', '#f2f2f2'],
    images: ['sneakers/u/on-cloud-olive-1.webp', 'sneakers/u/on-cloud-olive-2.webp'],
    description:
      'Швейцарская подошва CloudTec из полых «облаков»: мягко при приземлении, упруго при отталкивании.',
    releaseYear: 2025,
    isNew: true
  },
  {
    brand: 'Jordan',
    title: 'Air Jordan 1 High OG «Royal»',
    category: 'basketball',
    gender: 'unisex',
    price: 21990,
    colorway: 'синий / чёрный / белый',
    colors: ['#1f4fbf', '#141414', '#f2f2f2'],
    images: ['sneakers/u/jordan-1-high-royal-1.webp', 'sneakers/u/jordan-1-high-royal-2.webp'],
    description: 'Синий и чёрный — одна из трёх исходных расцветок 1985 года.',
    releaseYear: 2024
  },
  {
    brand: 'adidas',
    title: 'Ultraboost 1.0',
    category: 'running',
    gender: 'men',
    price: 17990,
    oldPrice: 21990,
    colorway: 'красный / синий',
    colors: ['#d63a2a', '#1d2d5a', '#f2f2f2'],
    images: ['sneakers/u/adidas-ultraboost-red-1.webp', 'sneakers/u/adidas-ultraboost-red-2.webp'],
    description:
      'Первая модель с пеной Boost по всей длине: трикотажный верх и пластиковая клетка вокруг средней части стопы.',
    releaseYear: 2023
  },
  {
    brand: 'Converse',
    title: 'Chuck Taylor All Star Low',
    category: 'lifestyle',
    gender: 'women',
    price: 6490,
    colorway: 'мятный / белый',
    colors: ['#bfe6d6', '#f2f2f2', '#141414'],
    images: ['sneakers/u/converse-chuck-mint-1.webp', 'sneakers/u/converse-chuck-mint-2.webp'],
    description: 'Низкие кеды в мятном канвасе — самая лёгкая пара на лето.',
    releaseYear: 2024
  },
  {
    brand: 'Nike',
    title: 'Air Monarch IV',
    category: 'lifestyle',
    gender: 'men',
    price: 8990,
    colorway: 'белый / тёмно-синий',
    colors: ['#f7f7f5', '#1d2d5a', '#c9ccd0'],
    images: ['sneakers/u/nike-air-monarch-white-navy-1.webp'],
    description: 'Массивный «папин» кроссовок: кожаный верх, широкая подошва и Air в пятке.',
    releaseYear: 2023
  },
  {
    brand: 'Nike',
    title: 'Kyrie 7 «Black»',
    category: 'basketball',
    gender: 'men',
    price: 11990,
    colorway: 'чёрный / белый',
    colors: ['#141414', '#f2f2f2', '#9aa0a6'],
    images: ['sneakers/u/nike-kyrie-7-black-1.webp'],
    description: 'Чёрные седьмые Kyrie: закруглённая подошва под резкие развороты и сетчатый верх.',
    releaseYear: 2021
  },
  {
    brand: 'Nike',
    title: 'SuperRep Go 3',
    category: 'running',
    gender: 'women',
    price: 8490,
    oldPrice: 9990,
    colorway: 'салатовый / чёрный',
    colors: ['#d7f22d', '#141414', '#f2f2f2'],
    images: ['sneakers/u/nike-superrep-volt-1.webp'],
    description:
      'Для тренировок в зале и функционального тренинга: широкая пятка, гибкий носок и трикотажный верх.',
    releaseYear: 2023
  },
  {
    brand: 'Converse',
    title: 'Chuck 70 Hi',
    category: 'lifestyle',
    gender: 'unisex',
    price: 9490,
    colorway: 'чёрный / белый',
    colors: ['#141414', '#f4efe2', '#f2f2f2'],
    images: ['sneakers/u/converse-chuck-70-black-hi-1.webp'],
    description:
      'Премиальная версия Chuck Taylor: плотный канвас, толще подошва, кремовая резина и мягкая стелька.',
    releaseYear: 2024
  },
  {
    brand: 'Vans',
    title: 'Sk8-Hi',
    category: 'skate',
    gender: 'unisex',
    price: 8990,
    colorway: 'чёрный / белый',
    colors: ['#141414', '#f2f2f2', '#c9ccd0'],
    images: ['sneakers/u/vans-sk8-hi-black-1.webp'],
    description:
      'Высокие скейтовые с полосой Jazz Stripe: замша, канвас и вафельная подошва, которая держит доску.',
    releaseYear: 2023
  },
  {
    brand: 'Vans',
    title: 'Old Skool «Grey»',
    category: 'skate',
    gender: 'unisex',
    price: 7990,
    colorway: 'серый / белый',
    colors: ['#8a8e92', '#f2f2f2', '#141414'],
    images: ['sneakers/u/vans-old-skool-grey-1.webp'],
    description: 'Old Skool в сером: замша и канвас, мягкий воротник и та самая вафельная подошва.',
    releaseYear: 2023
  },
  {
    brand: 'Vans',
    title: 'Old Skool',
    category: 'skate',
    gender: 'unisex',
    price: 7990,
    colorway: 'чёрный / белый',
    colors: ['#141414', '#f2f2f2', '#c9ccd0'],
    images: ['sneakers/u/vans-old-skool-black-1.webp'],
    description:
      'Главные скейтовые кеды с 1977 года: чёрный верх, белая полоса и вафельная подошва.',
    releaseYear: 2024
  },
  {
    brand: 'Puma',
    title: 'Suede Classic',
    category: 'lifestyle',
    gender: 'unisex',
    price: 7490,
    colorway: 'тёмно-синий / белый',
    colors: ['#1d2d5a', '#f2f2f2', '#b88a4a'],
    images: ['sneakers/u/puma-suede-navy-1.webp'],
    description: 'Замшевый силуэт 1968 года, на котором выросли и брейк-данс, и хип-хоп.',
    releaseYear: 2023
  },
  {
    brand: 'adidas',
    title: 'Superstar',
    category: 'court',
    gender: 'unisex',
    price: 10490,
    colorway: 'белый / чёрный',
    colors: ['#f4f4f2', '#141414', '#c9ccd0'],
    images: ['sneakers/u/adidas-superstar-white-black-1.webp'],
    description:
      'Резиновый мысок-«ракушка» и три чёрные полосы. Баскетбольная модель 1969 года, ставшая иконой улиц.',
    releaseYear: 2024
  },
  {
    brand: 'adidas',
    title: 'POD-S3.1',
    category: 'lifestyle',
    gender: 'men',
    price: 8990,
    oldPrice: 11990,
    colorway: 'оливковый / белый / оранжевый',
    colors: ['#6b6b3a', '#f2f2f2', '#f07a2a'],
    images: ['sneakers/u/adidas-pod-s3-olive-1.webp'],
    description:
      'Носочный верх и пена Boost в пятке — городской кроссовок с футуристичной подошвой.',
    releaseYear: 2020
  },
  {
    brand: 'Asics',
    title: 'GEL-Kayano 14',
    category: 'running',
    gender: 'unisex',
    price: 15990,
    colorway: 'белый / серебристый',
    colors: ['#f2f2f2', '#c9ccd0', '#1d2d5a'],
    images: ['sneakers/u/asics-gel-kayano-14-silver-1.webp'],
    description:
      'Беговой флагман 2008 года с металлическими вставками — главный ретро-раннер последних сезонов.',
    releaseYear: 2025,
    isNew: true
  },
  {
    brand: 'New Balance',
    title: '327',
    category: 'lifestyle',
    gender: 'unisex',
    price: 11490,
    colorway: 'серый / белый',
    colors: ['#9aa0a6', '#f2f2f2', '#e2d8c3'],
    images: ['sneakers/u/new-balance-327-grey-1.webp'],
    description:
      'Огромная буква N, выступающий протектор на пятке и замша — семидесятые, пересобранные для города.',
    releaseYear: 2024
  },
  {
    brand: 'Reebok',
    title: 'Floatride Energy 5',
    category: 'running',
    gender: 'unisex',
    price: 9990,
    colorway: 'белый / оранжевый / чёрный',
    colors: ['#f2f2f2', '#f07a2a', '#141414'],
    images: ['sneakers/u/reebok-white-orange-1.webp'],
    description:
      'Лёгкие беговые на пене Floatride Energy: пружинят на темповых и не разваливаются за сезон.',
    releaseYear: 2024
  }
]
