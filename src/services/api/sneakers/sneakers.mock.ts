import type { Sneaker } from '@/types'
import { asset } from '@/utils/asset'

export const SNEAKERS: Sneaker[] = [
  {
    id: 1,
    brand: 'Nike',
    title: 'Blazer Mid Suede',
    price: 12999,
    imageUrl: asset('sneakers/sneakers-1.jpg'),
    description:
      'Замшевый верх, высокий силуэт и вулканизированная подошва — модель, которая почти не изменилась с семидесятых и до сих пор собирается по той же колодке.'
  },
  {
    id: 2,
    brand: 'Nike',
    title: 'Air Max 270',
    price: 15600,
    imageUrl: asset('sneakers/sneakers-2.jpg'),
    description:
      'Самая высокая воздушная камера в линейке Air Max: 32 мм в пятке, полностью видимая сбоку. Верх из сетки, бесшовная посадка.'
  },
  {
    id: 3,
    brand: 'Nike',
    title: 'Blazer Mid Suede',
    price: 8499,
    imageUrl: asset('sneakers/sneakers-3.jpg'),
    description:
      'Светлая расцветка на кремовой замше с контрастным свушем. Классический баскетбольный крой, который давно переехал в повседневную носку.'
  },
  {
    id: 4,
    brand: 'Puma',
    title: 'X Aka Boku Future Rider',
    price: 8999,
    imageUrl: asset('sneakers/sneakers-4.jpg'),
    description:
      'Коллаборация с японской студией Aka Boku: ретро-беговой силуэт восьмидесятых, лёгкая пена IMEVA и нейлоновый верх.'
  },
  {
    id: 5,
    brand: 'Under Armour',
    title: 'Curry 8',
    price: 15199,
    imageUrl: asset('sneakers/sneakers-5.jpg'),
    description:
      'Восьмая модель Стефена Карри. Верх UA Warp фиксирует стопу без лишних слоёв, подошва Flow сделана без резины — легче и цепче на паркете.'
  },
  {
    id: 6,
    brand: 'Nike',
    title: 'Kyrie 7',
    price: 11299,
    imageUrl: asset('sneakers/sneakers-6.jpg'),
    description:
      'Круглая пяточная зона и агрессивный протектор под резкие смены направления — модель собрана вокруг манеры игры Кайри Ирвинга.'
  },
  {
    id: 7,
    brand: 'Jordan',
    title: 'Air Jordan Mid',
    price: 10799,
    imageUrl: asset('sneakers/sneakers-7.jpg'),
    description:
      'Средняя высота, кожаный верх и перфорация на мыске. Тот самый силуэт, с которого началась вся линейка Jordan.'
  },
  {
    id: 8,
    brand: 'Nike',
    title: 'LeBron XVIII',
    price: 16499,
    imageUrl: asset('sneakers/sneakers-8.jpg'),
    description:
      'Связка Air Max 180 в пятке и Zoom Air в носке под вес и скорость Леброна. Верх Knitposite 2.0 тянется только там, где нужно.'
  },
  {
    id: 9,
    brand: 'Nike',
    title: 'LeBron XVIII Low',
    price: 13999,
    imageUrl: asset('sneakers/sneakers-9.jpg'),
    description:
      'Низкая версия восемнадцатой модели: тот же амортизационный пакет, но легче на сто граммов и свободнее в голеностопе.'
  },
  {
    id: 10,
    brand: 'Nike',
    title: 'Blazer Mid Suede',
    price: 9599,
    imageUrl: asset('sneakers/sneakers-10.jpg'),
    description:
      'Тёмная замша, состаренная midsole и винтажный свуш. Blazer в той отделке, ради которой его обычно и берут.'
  },
  {
    id: 11,
    brand: 'Nike',
    title: 'Kyrie Flytrap IV',
    price: 11299,
    imageUrl: asset('sneakers/sneakers-11.jpg'),
    description:
      'Бюджетная ветка линейки Kyrie: та же геометрия подошвы, но проще материалы верха. Рабочая пара для зала.'
  },
  {
    id: 12,
    brand: 'Nike',
    title: 'Kyrie Flytrap IV',
    price: 8899,
    imageUrl: asset('sneakers/sneakers-12.jpg'),
    description:
      'Контрастная расцветка Flytrap IV. Усиленный мысок и широкая опора под передней частью стопы.'
  }
]
